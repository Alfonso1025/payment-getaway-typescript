import { ShippingAddress } from "../types";
import { IShippAddrRepo } from "./IShippAddrRepo";
import {ResultSetHeader } from 'mysql2';
import { QueryError } from "../../dbconnections/errors";
import db from "../../dbconnections/sql/sql";
import { shippAddrRouter } from "../routes";
export class SqlRepo implements IShippAddrRepo{

    async post(shippingAddress: ShippingAddress): Promise<string> {
      
      const {street, city, state, zipcode, unit} = shippingAddress
      const query = 'INSERT INTO shipping_address (street, city, state,zipcode,unit) VALUES (?,?,?,?,?) ';
      const values = [street, city,state,zipcode,unit]
      return new Promise((resolve, reject)=>{
        db.query(query,values, (error, result: ResultSetHeader)=>{
            if(error){
                console.log(error.message)
                reject(new QueryError(error.message))
                
            }
            else if(result.insertId){
                resolve('success')
            }
        })
    })
      
    }
    async get(personId: string): Promise<string> {
          return await 'pass'
        
    }
    async edit(field: string, value: any): Promise<string> {
          return await 'pass'
    }
    async delete(shippAddrId: number): Promise<string> {
          return await 'pass'
    }
}