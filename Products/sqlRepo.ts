import { IProductsRepo } from "./IProductsRepo";
import { Product,insertedId } from "./types";
import { imageKey } from "./imageService/types";
import db from "../dbconnections/sql/sql";
import { QueryError } from "../dbconnections/errors";
import {ResultSetHeader } from 'mysql2';
import { error } from "console";
import { ResponseObject } from "../queryResponse/types";


export class SqlProductsRepo implements IProductsRepo{
    constructor(
        private responseObject : ResponseObject,
    
    ){}

    getAllProducts(): Promise < ResponseObject > {

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
                this.responseObject.data = result
                this.responseObject.message = 'success'
                
                resolve(this.responseObject)
            })
        })
        
    }
    addProduct(product: Product): Promise<insertedId> {

        const query = 'INSERT INTO products (product_name, price, category, product_description, product_image, qty) VALUES (?, ?, ?, ?, ?,?)';
        const values = [product.product_name, product.price, product.category,product.product_description,product.qty]
        return new Promise((resolve, reject)=>{
            db.query(query,values, (error, result: ResultSetHeader)=>{
                if(error){
                    console.log(error.message)
                    reject(new QueryError(error.message))
                    
                }
                else if(result){
                    console.log(result)
                    resolve(result.insertId)
                }
            })
        })
        
    }
   
    async addQuantity(qty: number, productId: number): Promise<string> {

        const addQuery = 'UPDATE productss SET qty = qty + ? WHERE product_id = ?';
        const values = [qty, productId]
        
        const result = await new  Promise<ResultSetHeader>((resolve, rejects)=>{
                db.query(addQuery,values, (error, result)=>{
                    if(error){
                        rejects( new QueryError(error.message))
                    }
                    console.log('resolved promise')
                    resolve(result as ResultSetHeader)
                })
            })
            console.log(typeof result.affectedRows)

            if(result.affectedRows > 0) return 'successful_update'
            return 'update_failed'
            
       

    }
    async reduceQuantity(qty: number, productId: number): Promise<string> {
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
           

            if(result.affectedRows > 0) return 'successful_update'
            return 'update_failed'
            
    }
    async editPrice(productId: number, newPrice : number): Promise<string> {

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
            

            if(result.affectedRows > 0) return 'successful_update'
            return 'update_failed'
    }
    async editDescription(productId: number, newDescript: string): Promise<string> {

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
            

            if(result.affectedRows > 0) return 'successful_update'
            return 'update_failed'
    }
    async addImage(productId: number, imageName: string): Promise<insertedId> {

        const query = 'INSERT INTO products_images (product_id,image_name) VALUES (?, ?)'
        const values = [productId, imageName]

        return new Promise((resolve, reject)=>{
            db.query(query,values, (error, result: ResultSetHeader)=>{
                if(error){
                    console.log(error.message)
                    reject(new QueryError(error.message))
                    
                }
                else if(result){
                    console.log(result)
                    resolve(result.insertId)
                }
            })
        })
    
        
    }
    async deleteImage(imageId: number): Promise<string> {
        return await 'to be built'
    }
    async removeMainImgStatus(oldMainImageId: number): Promise<string>{
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
                                
                    
        if(result.affectedRows > 0) return 'success_removing_main_status'
        return 'failed_to_remove_main_status'
        
        
    }

    async selectMainImage(newMainImageId: number, oldMainImageId:number | null): Promise<string> {
       
        if(typeof oldMainImageId === 'number' ){
            
            const removeStatusResult: string = await this.removeMainImgStatus(oldMainImageId)
            
            if(removeStatusResult ===  'failed_to_remove_main_status'){
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
        
       
        if(result.affectedRows > 0) return 'success_updating_main_image'
        return 'failed_updating_main_image'
        
    }
    async deleteImages(productId:number):Promise<string>{

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
        if(result.affectedRows > 0)  console.log('success_deleting_associated_images')
        if(result.affectedRows == 0) console.log('no images matched')
            
        return 'no_record_matched'
        
    }
    async deleteProduct(productId: number): Promise<string> {
        this.deleteImages(productId)
        return await 'pass'
    }
    
   
}