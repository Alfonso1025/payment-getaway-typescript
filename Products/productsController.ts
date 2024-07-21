import { IProductsRepo } from "./IProductsRepo";
import { Request, Response } from "express";
import { Product, ProductImage } from "./types";
import { DbConnectionError, QueryError } from "../dbconnections/errors";
import { IImageService } from "./imageService/IImageService";
import { ImgServiceConnectionErr } from "./imageService/errors";
import { ResponseObject } from "../queryResponse/types";
import { IResolver } from "../services/resolver/IResolver";

export class ProductsController{
    constructor(
        private productsRepo : IProductsRepo,
        private imageService : IImageService,
        private resolver : IResolver
        
    ){}
    async sendResponse( result: ResponseObject){
        
        if(result.message === 'success') return this.resolver.success(result.data, result.message)
        else return this.resolver.notFound(null, result.message)
    }
    /*  
        retrieveImages is a helper method used by getAllProducts() to fetch all images
        associated to a product from the cloud. The method returns a promise that
        resolves with an array of Product objects that have their images nested 
        1 For each product, store the product_images in an images constant.
            2 If images is an array of type ProductImage, iterate over such array.
                3 Check that the image_name property of each element is a string
                4 if so, pass the image_name to the imageService.retrieveImage method as argument
                This method returns a url of the image stored in the cloud. 
                5 Replace the value of the image_name property with the url. 
        At the end of the loop, each product should have its images and it is ready to be sent
        to the client
    */
    async retrieveImages(products: Product[]): Promise<Product[]> {
        
        for (let i = 0; i < products.length; i++) {
            const images:ProductImage[] | null = products[i].product_images;
            if (Array.isArray(images) && images.length > 0) {
            
                for (let j = 0; j < images.length; j++) {
                    
                    const img = images[j].image_name;
                   
                    if (typeof img === 'string') {
                        
                        try {
                            const url = await this.imageService.retrieveImage(img);
                            
                            images[j].url = url;
                        } catch (error) {
                            if(error instanceof ImgServiceConnectionErr){
                                console.error(`Error retrieving image ${img} for product ${products[i].product_name}:`, error.message);
                            }
                            else{
                                console.log(error)
                            }
                            
                            
                        }
                    }
                }
                
            }
        }
        return products;
    }
    
    async getAllProducts(req:Request, res: Response){

        this.resolver.setResponse(res)
        try {
            const result: ResponseObject = await this.productsRepo.getAll()
            const products = result.data 
            
            if(products === null){
                console.log('products is null')
                this.sendResponse(result)
                return
            }

            const productsWithImages = await this.retrieveImages(products)
            result.data = productsWithImages
            
            this.sendResponse(result)
            

            
        } catch (error) {
            if(error instanceof DbConnectionError){
                console.log('a db connection error ocurred: ', error.message)
            }
            else if(error instanceof QueryError){
                console.log('error excuting the db query: '), error.message
            }
            this.resolver.internalServerError(error, 'internal server error')
            
        }
       
    }
    async addProduct(req:Request, res: Response){

        const product : Product = req.body
        this.resolver.setResponse(res)
        
        try {
            const result:ResponseObject = await this.productsRepo.post(product)
            this.sendResponse(result)
            
           
        } catch (error) {
            if(error instanceof DbConnectionError){
                console.log('an error occurred while connecting to the db', error.message)
                return res.status(500).send('internal server error')
            }
            if(error instanceof QueryError){
                console.log('a query sintax error ocurred', error.message)
                return this.resolver.internalServerError(null, error.message)
            }

        }
        
       
    }
    async addQuantity(req:Request,res:Response){
        this.resolver.setResponse(res)
        const qty : number = req.body.qty
        const productId : number = req.body.productId
        try {
            const result = await this.productsRepo.addQuantity(qty,productId)
            this.sendResponse(result)
            
        } catch (error) {
            if(error instanceof DbConnectionError){
                console.log('a dbconnection error occurred', error.message)
                return res.status(500).send('internal server error')
            }
            if(error instanceof QueryError){
                console.log('a query sintax error ocurred', error.message)
                return this.resolver.internalServerError(null, error.message)
            }
        }
        
    }
    async reduceQuantity(req:Request,res:Response){

        const qty : number = req.body.qty
        const productId : number = req.body.productId
        try {
            const result = await this.productsRepo.reduceQuantity(qty,productId)
            this.sendResponse(result)
            
            
            
        } catch (error) {
            if(error instanceof DbConnectionError){
                console.log('a dbconnection error occurred', error.message)
                return res.status(500).send('internal server error')
            }
            if(error instanceof QueryError){
                console.log('a query sintax error ocurred', error.message)
                return this.resolver.internalServerError(null, error.message)
            }
        }
       
    }
    async editPrice(req: Request, res: Response){

        const newPrice : number = req.body.newPrice
        const productId : number = req.body.productId
        try {
            const result = await this.productsRepo.editPrice(productId,newPrice)
            this.sendResponse(result)
            
        } catch (error) {
            if(error instanceof QueryError){
                console.log('a dbconnection error occurred', error.message)
                res.status(500).send('internal server error')
            }
            if(error instanceof QueryError){
                console.log('a query sintax error ocurred', error.message)
                return this.resolver.internalServerError(null, error.message)
            }
        }

    }
    async editDescript(req: Request, res: Response){

        const newDescript : string = req.body.newDescript
        const productId : number = req.body.productId
        try {
            const result = await this.productsRepo.editDescription(productId,newDescript)
            this.sendResponse(result)
        } catch (error) {
            if(error instanceof DbConnectionError){
                console.log('a dbconnection error occurred', error.message)
                return res.status(500).send('internal server error')
            }
            if(error instanceof QueryError){
                console.log('a query sintax error ocurred', error.message)
                return this.resolver.internalServerError(null, error.message)
            }
        }

    }
    async addImage(req : Request, res: Response){
        const file = req.file
        console.log(file)
        if (!file?.path) {
            return res.status(400).send('File not provided or path is undefined');
        }
        
        const prodId: number = 2
        const imgName : string = file.originalname
        try {
          
            const result = await this.imageService.uploadImage(file.path, imgName)
            
            if(result === 'image_uploaded_succesfuly'){
                const resultQuery: ResponseObject = await this.productsRepo.addImage(prodId, imgName)
                return this.sendResponse(resultQuery)
            }
            this.resolver.internalServerError(null, 'failed_uploading_to_the_cloud')
            
            
        } catch (error) {
            if(error instanceof DbConnectionError){
                console.log('a db error ocurred', error.message)
                return res.status(500).send('internal server error')
            }
            if(error instanceof QueryError){
                console.log('a query sintax error ocurred', error.message)
                return this.resolver.internalServerError(null, error.message)
            }
        }    
       
    }
   async  setMainImage(req: Request, res: Response){
        try {
            const result: ResponseObject = await this.productsRepo.selectMainImage(3,null)
            this.sendResponse(result)
        } catch (error) {
            if(error instanceof DbConnectionError){
                console.log('a dbconnection error occurred', error.message)
                res.status(500).send('internal server error')
            }
            
            
        }
        
    }
    async deleteProduct(req: Request, res: Response){
        const images = ['elon.png', 'popo.png']
        //const result = await this.imageService.deleteImages(images)
         this.productsRepo.deleteProduct(2)
       
    }
     


}