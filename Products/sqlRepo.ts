import { IProductsRepo } from "./IProductsRepo";
import { Product,insertedId } from "./types";
import { imageKey } from "./imageService/types";
import db from "../dbconnections/sql/sql";
import { QueryError } from "../dbconnections/errors";
import {QueryResult, ResultSetHeader } from 'mysql2';
import { error } from "console";
import { ResponseObject } from "../queryResponse/types";
import { ICheckQryResult } from "../services/CheckQueryResult/ICheckQryResult";


export class SqlProductsRepo implements IProductsRepo{
    constructor(
        private responseObject : ResponseObject,
        private checkQryResult : ICheckQryResult<QueryResult | ResultSetHeader>
    
    ){}

    getAll(): Promise < ResponseObject > {
        
        const query = 
            `SELECT 
                p.product_id,
                p.product_name,
                p.price,
                p.category,
                p.product_description,
                p.qty,
                (
                    SELECT JSON_ARRAYAGG(JSON_OBJECT(
                        'image_name', pi.image_name,
                        'isMain', pi.isMain,
                        'image_id', pi.image_id
                    ))
                    FROM (
                        SELECT * 
                        FROM products_images 
                        WHERE product_id = p.product_id
                        ORDER BY isMain DESC, image_name
                    ) pi
                ) AS product_images
            FROM products p
            LEFT JOIN products_images pi ON p.product_id = pi.product_id
            GROUP BY p.product_id;`
        ;

        return new Promise((resolve, reject)=>{
            db.query(query, (error, result)=>{
                if(error){
                    reject(new QueryError(error.message))
                }
                
                const isThereData = this.checkQryResult.isThereData(result)
                if(!isThereData){
                    this.responseObject.data = null
                    this.responseObject.message = 'No products were found'
                }
                else if(isThereData){

                    this.responseObject.data = result
                    this.responseObject.message = 'success'
                }
                
                
                resolve(this.responseObject)
            })
        })
        
    }
    post(product: Product): Promise<ResponseObject> {

        const query = 'INSERT INTO products (product_name, price, category, product_description, qty) VALUES (?,?,?,?,?)';
        
        const values = [product.product_name, product.price, product.category,product.product_description,product.qty]
        
        return new Promise((resolve, reject)=>{
            db.query(query,values, (error, result: ResultSetHeader)=>{
                if(error){
                    
                    reject(new QueryError(error.message))
                    
                }
                else if(result){
                    if(this.checkQryResult.isThereInsertId(result)){
                        this.responseObject.data = result.insertId
                        this.responseObject.message = 'success'
                    } 
                    resolve(this.responseObject)
                }
                
               
            
            })
        })
        
    }
   
    async addQuantity(qty: number, productId: number): Promise<ResponseObject> {

        const addQuery = 'UPDATE products SET qty = qty + ? WHERE product_id =?';
        const values = [qty, productId]
        
        const result = await new  Promise<ResultSetHeader>((resolve, rejects)=>{
                db.query(addQuery,values, (error, result)=>{
                    if(error){
                        rejects( new QueryError(error.message))
                    }
                    
                    resolve(result as ResultSetHeader)
                })
            })
            const areAffectedRows = this.checkQryResult.areThereAffectedRows(result)
            if(!areAffectedRows){
                this.responseObject.data = null
                this.responseObject.message = 'no records were matched to update'
                 }
            else {
                this.responseObject.data = null
                this.responseObject.message = 'success'
            }
            return this.responseObject
            
       

    }
    async reduceQuantity(qty: number, productId: number): Promise<ResponseObject> {
        const reduceQuery = 'UPDATE products SET qty = qty - ? WHERE product_id = ?';
        const values = [qty, productId]
        
        const result = await new  Promise<ResultSetHeader>((resolve, rejects)=>{
                db.query(reduceQuery,values, (error, result)=>{
                    if(error){
                        rejects( new QueryError(error.message))
                    }
                  
                    resolve(result as ResultSetHeader)
                })
            })
            const areAffectedRows = this.checkQryResult.areThereAffectedRows(result)
            if(!areAffectedRows){
                this.responseObject.data = null
                this.responseObject.message = 'no records were matched to update'
                 }
            else {
                this.responseObject.data = null
                this.responseObject.message = 'success'
            }
            return this.responseObject
            
           

            
            
    }
    async editPrice(productId: number, newPrice : number): Promise<ResponseObject> {

        const reduceQuery = 'UPDATE productss SET price = ? WHERE product_id = ?';
        const values = [newPrice, productId]
        console.log('new price: ', newPrice)
        const result = await new  Promise<ResultSetHeader>((resolve, rejects)=>{
                db.query(reduceQuery,values, (error, result)=>{
                    if(error){
                        rejects( new QueryError(error.message))
                    }
                   
                    resolve(result as ResultSetHeader)
                })
            })
            const areAffectedRows = this.checkQryResult.areThereAffectedRows(result)
            if(!areAffectedRows){
                this.responseObject.data = null
                this.responseObject.message = 'no records were matched to update'
                 }
            else{
                this.responseObject.data = null
                this.responseObject.message = 'success'
            }
            return this.responseObject
            
            

            
    }
    async editDescription(productId: number, newDescript: string): Promise<ResponseObject> {

        const reduceQuery = 'UPDATE products SET product_description = ? WHERE product_id = ?';
        const values = [newDescript, productId]
    
        const result = await new  Promise<ResultSetHeader>((resolve, rejects)=>{
                db.query(reduceQuery,values, (error, result)=>{
                    if(error){
                        rejects( new QueryError(error.message))
                    }
                   
                    resolve(result as ResultSetHeader)
                })
            })
            const areAffectedRows = this.checkQryResult.areThereAffectedRows(result)
            if(!areAffectedRows){
                this.responseObject.data = null
                this.responseObject.message = 'no records were matched to update'
                 }
            else if(areAffectedRows){
                this.responseObject.data = null
                this.responseObject.message = 'success'
            }
            return this.responseObject
            
            

          
    }
    async addImage(productId: number, imageName: string): Promise<ResponseObject> {

        const query = 'INSERT INTO products_images (product_id,image_name) VALUES (?, ?)'
        const values = [productId, imageName]

        return new Promise((resolve, reject)=>{
            db.query(query,values, (error, result: ResultSetHeader)=>{
                if(error){
                    console.log(error.message)
                    reject(new QueryError(error.message))
                    
                }
                if(this.checkQryResult.isThereInsertId(result)){
                    this.responseObject.data = result.insertId
                    this.responseObject.message = 'success'
                }
            })
        })
    
        
    }
    async deleteImage(imageId: number): Promise<string> {
        return await 'to be built'
    }
    async removeMainImgStatus(oldMainImageId: number): Promise<ResponseObject>{

        const query: string = `UPDATE products_images SET isMain = FALSE
                                WHERE image_id = ? `
        const values = [oldMainImageId]
        const result = await new  Promise<ResultSetHeader>((resolve, rejects)=>{
                       db.query(query,values, (error, result)=>{
                            if(error){
                                
                                rejects( new QueryError(error.message))
                            }
                                       
                                resolve(result as ResultSetHeader)
                        })
                    })
                                
                    
        const areAffectedRows = this.checkQryResult.areThereAffectedRows(result)
            if(!areAffectedRows){
                this.responseObject.data = null
                this.responseObject.message = 'no records were matched to update'
            }
            else if(areAffectedRows){
                this.responseObject.data = null
                this.responseObject.message = 'success'
            }
            return this.responseObject
        
        
    }

    async selectMainImage(newMainImageId: number, oldMainImageId:number | null): Promise<ResponseObject> {
       
        if(typeof oldMainImageId === 'number' ){
            
            const removeStatusResult: ResponseObject = await this.removeMainImgStatus(oldMainImageId)
            
            if(removeStatusResult.message ===  'no records were matched to update'){
                return removeStatusResult
            }    
        }
        const query = 'UPDATE products_images SET isMain = TRUE WHERE image_id = ?'
        const values = [newMainImageId]

        const result = await new  Promise<ResultSetHeader>((resolve, rejects)=>{
                       db.query(query,values, (error, result)=>{
                            if(error){
                                
                                rejects( new QueryError(error.message))
                            }
                                       
                                resolve(result as ResultSetHeader)
                        })
                    })
        
       
        const areAffectedRows = this.checkQryResult.areThereAffectedRows(result)
            if(!areAffectedRows){
                this.responseObject.data = null
                this.responseObject.message = 'no records were matched to update'
            }
            else if(areAffectedRows){
                this.responseObject.data = null
                this.responseObject.message = 'success'
            }
            return this.responseObject
        
    }
    getAssociatedImages(producId: number): Promise<ResponseObject> {
        const query = 'SELECT image_name FROM products_images WHERE product_id = ?'
        const values = [producId]

         return new Promise((resolve, reject)=>{
            db.query(query,values, (error, result)=>{
                if(error){
                    reject(new QueryError(error.message))
                }
                
                const isThereData = this.checkQryResult.isThereData(result)
                if(!isThereData){
                    this.responseObject.data = null
                    this.responseObject.message = 'No images were found'
                }
                else if(isThereData){
                    this.responseObject.data = result
                    this.responseObject.message = 'success'
                }
                
                
                resolve(this.responseObject)
            })
        })
    }
    async deleteImages(productId:number):Promise<ResponseObject>{

        const query = 'DELETE FROM products_images WHERE product_id = ?'
        const values = [productId]
        const result = await new Promise<ResultSetHeader>((resolve , reject)=>{
            db.query(query,values, (error, result)=>{
                if(error){
                    reject( new QueryError(error.message))
                }
                resolve(result as ResultSetHeader)
            })
        })
        const areAffectedRows = this.checkQryResult.areThereAffectedRows(result)
        if(!areAffectedRows){
            this.responseObject.data = null
            this.responseObject.message = 'no records were matched to update'
        }
        else if(areAffectedRows){
            this.responseObject.data = null
            this.responseObject.message = 'success'
        }
        return this.responseObject
            
        
        
    }
    async deleteProduct(productId: number): Promise<ResponseObject> {
       const query = 'delete from products where product_id = ?'
       const values = [productId]
        const result = await new Promise<ResultSetHeader>((resolve , reject)=>{
            db.query(query,values, (error, result)=>{
                if(error){
                    reject( new QueryError(error.message))
                }
                resolve(result as ResultSetHeader)
            })
        })
        const areAffectedRows = this.checkQryResult.areThereAffectedRows(result)
        if(!areAffectedRows){
            this.responseObject.data = null
            this.responseObject.message = 'no records were matched to update'
        }
        else if(areAffectedRows){
            this.responseObject.data = null
            this.responseObject.message = 'success'
        }
        return this.responseObject

    }
    
   
}