import { IProductsRepo } from "./IProductsRepo";
import { Product,insertedId } from "./types";
import { imageKey } from "./imageService/types";
import db from "../dbconnections/sql/sql";
import { QueryError } from "../dbconnections/errors";
import {QueryResult, ResultSetHeader } from 'mysql2';
import { ResponseObject } from "../services/queryResponse/types";
import { IDbQuery } from "../services/DbQueryService/IDbQuery";
import { query } from "express";


export class SqlProductsRepo implements IProductsRepo{
    constructor(
        
        private dbQuery : IDbQuery
    
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

        
        return  this.dbQuery.get(query,null)
        
    }
    addProduct(product: Product): Promise<ResponseObject> {

        const query = 'INSERT INTO products (product_name, price, category, product_description, qty) VALUES (?,?,?,?,?)';
        
        const values = [product.product_name, product.price, product.category,product.product_description,product.qty]
        
        return this.dbQuery.post(query, values)
          
    }
   
    async addQuantity(qty: number, productId: number): Promise<ResponseObject> {

        const query = 'UPDATE products SET qty = qty + ? WHERE product_id =?';
        const values = [qty, productId]
        
        return this.dbQuery.put(query,values)
    }

    async reduceQuantity(qty: number, productId: number): Promise<ResponseObject> {
        const query = 'UPDATE products SET qty = qty - ? WHERE product_id = ?';
        const values = [qty, productId]
        
        return this.dbQuery.put(query,values)
                         
    }
    async editPrice(productId: number, newPrice : number): Promise<ResponseObject> {

        const query = 'UPDATE productss SET price = ? WHERE product_id = ?';
        const values = [newPrice, productId]
        
        return this.dbQuery.put(query,values)
                   
    }
    async editDescription(productId: number, newDescript: string): Promise<ResponseObject> {

        const query = 'UPDATE products SET product_description = ? WHERE product_id = ?';
        const values = [newDescript, productId]
    
        return this.dbQuery.put(query,values)   
    }
    async addImage(productId: number, imageName: string): Promise<ResponseObject> {

        const query = 'INSERT INTO products_images (product_id,image_name) VALUES (?, ?)'
        const values = [productId, imageName]

        return this.dbQuery.post(query,values)
    
        
    }
    async deleteImage(imageId: number): Promise<string> {
        return await 'to be built'
    }
    async removeMainImgStatus(oldMainImageId: number): Promise<ResponseObject>{

        const query: string = `UPDATE products_images SET isMain = FALSE
                                WHERE image_id = ? `
        const values = [oldMainImageId]
        
        return this.dbQuery.put(query,values)
        
        
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

        return this.dbQuery.put(query,values)
           
    }

    getAssociatedImages(producId: number): Promise<ResponseObject> {
       
        
        const query = 'SELECT image_name FROM products_images WHERE product_id = ?'
        const values = [producId]
         
        return this.dbQuery.get(query,values)

         
    
    }

    async deleteImages(productId:number):Promise<ResponseObject>{

        const query = 'DELETE FROM products_images WHERE product_id = ?'
        const values = [productId]

        return this.dbQuery.delete(query, values)    
        
    }
    async deleteProduct(productId: number): Promise<ResponseObject> {
       const query = 'delete from products where product_id = ?'
       const values = [productId]
        
        return this.dbQuery.delete(query,values)

    }
    
   
}