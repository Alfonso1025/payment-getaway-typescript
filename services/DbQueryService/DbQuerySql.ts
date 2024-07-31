import { IDbQuery } from "./IDbQuery";
import { ResponseObject } from "../queryResponse/types";
import db from "../../dbconnections/sql/sql";
import {QueryResult, ResultSetHeader } from 'mysql2';
import { QueryError } from "../../dbconnections/errors";
import { ICheckQryResult } from "../CheckQueryResult/ICheckQryResult";

export class DbQuerySql implements IDbQuery{
    constructor(
        private responseObject: ResponseObject,
        private checkQryResult : ICheckQryResult<QueryResult | ResultSetHeader>
    
    ){}
    async get(query: string, values: any[]):Promise< ResponseObject> {
    
        return new Promise((resolve, reject)=>{
            db.query(query, values,(error, result)=>{
                if(error){
                    reject(new QueryError(error.message))
                }
                
                const isThereData = this.checkQryResult.isThereData(result)
                if(!isThereData){
                    this.responseObject.data = null
                    this.responseObject.message = 'No records were found'
                }
                else if(isThereData){

                    this.responseObject.data = result
                    this.responseObject.message = 'success'
                }
                
                
                resolve(this.responseObject)
            })
        })
        
    }
    post(query: string, values: any[]): Promise<ResponseObject> {

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
    async put(query: string, values: any[]):Promise< ResponseObject> {

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
        else {
            this.responseObject.data = null
            this.responseObject.message = 'success'
        }
        return this.responseObject
        
   
    }
    async delete(query: string, values: any[]): Promise<ResponseObject> {
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
            this.responseObject.message = 'no records were matched to delete'
        }
        else if(areAffectedRows){
            this.responseObject.data = null
            this.responseObject.message = 'success'
        }
        return this.responseObject
    }
    
}