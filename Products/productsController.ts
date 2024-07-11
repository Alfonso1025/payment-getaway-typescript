import { IProductsRepo } from "./IProductsRepo";
import { NextFunction, Request, Response } from "express";
import { Product, ProductImage } from "./types";
import { DbConnectionError, QueryError } from "../dbconnections/errors";
import { IImageService } from "./imageService/IImageService";
import { ImgServiceConnectionErr } from "./imageService/errors";
import { ResponseObject } from "../queryResponse/types";
import { IResolver } from "../resolver/IResolver";

export class ProductsController{
    constructor(
        private productsRepo : IProductsRepo,
        private imageService : IImageService,
        private resolver : IResolver
        
    ){}
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
            const result: ResponseObject = await this.productsRepo.getAllProducts()
            const products = result.data
            const productsWithImages = await this.retrieveImages(products)
            console.log(productsWithImages)
            this.resolver.success(productsWithImages, 'success')
            //res.status(200).send(productsWithImages)
        } catch (error) {
            if(error instanceof DbConnectionError){
                console.log('a db connection error ocurred: ', error.message)
            }
            res.status(500).send('internal server error')
        }
       
    }
    async addProduct(req:Request, res: Response){
        const product : Product = req.body
        
        console.log(product)
        try {
            const result = await this.productsRepo.addProduct(product)
            if(result && typeof result === 'number' ){
                console.log('this is the result : ', result)
                res.status(200).send('new product inserted')
            }
            else{
                res.status(500).send('an error occured while inserting the new product')
            }
        } catch (error) {
            if(error instanceof DbConnectionError){
                console.log('a db error ocurred', error.message)
                res.status(500).send('internal server error')
            }
        }
        
       
    }
    async addQuantity(req:Request,res:Response){
        const qty : number = req.body.qty
        const productId : number = req.body.productId
        try {
            const result = await this.productsRepo.addQuantity(qty,productId)
            console.log('this is the result: ', result)
            if(result === 'successful_update') return res.status(200).send('succesful update')
            else if(result === 'update_failed') return res.status(400).send('the update failed. Mkake sure to send a valid productId')
            
        } catch (error) {
            if(error instanceof DbConnectionError){
                console.log('a dbconnection error occurred', error.message)
                res.status(500).send('internal server error')
            }
        }
        
    }
    async reduceQuantity(req:Request,res:Response){

        const qty : number = req.body.qty
        const productId : number = req.body.productId
        try {
            const result = await this.productsRepo.reduceQuantity(qty,productId)
            console.log('this is the result: ', result)
            if(result === 'successful_update') return res.status(200).send('succesful update')
            else if(result === 'update_failed') return res.status(400).send('the update failed. Mkake sure to send a valid productId')
            
        } catch (error) {
            if(error instanceof DbConnectionError){
                console.log('a dbconnection error occurred', error.message)
                res.status(500).send('internal server error')
            }
        }
       
    }
    async editPrice(req: Request, res: Response){

        const newPrice : number = req.body.newPrice
        const productId : number = req.body.productId
        try {
            const result = await this.productsRepo.editPrice(productId,newPrice)
            
            if(result === 'successful_update') return res.status(200).send('succesful update')
            else if(result === 'update_failed') return res.status(400).send('the update failed. Mkake sure to send a valid productId')
            
        } catch (error) {
            if(error instanceof QueryError){
                console.log('a dbconnection error occurred', error.message)
                res.status(500).send('internal server error')
            }
        }

    }
    async editDescript(req: Request, res: Response){

        const newDescript : string = req.body.newDescript
        const productId : number = req.body.productId
        try {
            const result = await this.productsRepo.editDescription(productId,newDescript)
            
            if(result === 'successful_update') return res.status(200).send('succesful update')
            else if(result === 'update_failed') return res.status(400).send('the update failed. Make sure to send a valid productId')
            
        } catch (error) {
            if(error instanceof DbConnectionError){
                console.log('a dbconnection error occurred', error.message)
                res.status(500).send('internal server error')
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
            if(result === 'failed_uploading_image') return res.status(500).send('failed uploading')
            if(result === 'image_uploaded_succesfuly'){
                const resultQuery = await this.productsRepo.addImage(prodId, imgName)
                console.log('this is the result query',resultQuery)
                if(resultQuery && typeof resultQuery === 'number' ){ 
                    return res.status(200).send('new product inserted')
                }
                
                
            }
            
            
        } catch (error) {
            if(error instanceof DbConnectionError){
                console.log('a db error ocurred', error.message)
                return res.status(500).send('internal server error')
            }
            console.log(error)
        }    
       
    }
   async  setMainImage(req: Request, res: Response){
        try {
            const selectResult: string = await this.productsRepo.selectMainImage(3,null)
            if(selectResult === 'success_updating_main_image') return res.status(200).send(selectResult)
            return res.status(404).send(selectResult)
        } catch (error) {
            if(error instanceof DbConnectionError){
                console.log('a dbconnection error occurred', error.message)
                res.status(500).send('internal server error')
            }
            else{
                console.log(error)
            }
        }
        
    }
    async deleteProduct(req: Request, res: Response){
        const images = ['elon.png', 'popo.png']
        //const result = await this.imageService.deleteImages(images)
         this.productsRepo.deleteProduct(2)
       
    }
     


}