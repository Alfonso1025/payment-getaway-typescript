import { IShippAddrRepo } from "./Repos/IShippAddrRepo";
import { Request,Response } from "express";
import { ShippingAddress } from "./types";
import { DbConnectionError, QueryError } from "../dbconnections/errors";
import { IResolver } from "../services/resolver/IResolver";
import { QueryResult } from "mysql2";
import { ResponseObject } from "../services/queryResponse/types";
import { CreateAddressDto } from "./dtos/createAddress.dto";

export class Controller{

    private shippAddrRepo: IShippAddrRepo;
    private resolver: IResolver

    constructor(shippAddrRepo: IShippAddrRepo, resolver: IResolver) {
        this.shippAddrRepo = shippAddrRepo;
        this.resolver = resolver
    }
    async sendResponse( result: ResponseObject){
        
        if(result.message === 'success') return this.resolver.success(result.data, result.message)
        else return this.resolver.notFound(null, result.message)
    }

    //post a new shipping address
    async post(req: Request, res: Response){
        
        this.resolver.setResponse(res)
        const createAddressDto: CreateAddressDto = req.body
        

        try {
            const result: ResponseObject = await this.shippAddrRepo.addShippingAddress(createAddressDto)
            console.log('this is the result: ',result)
            this.sendResponse(result)
        } catch (error) {
            if(error instanceof DbConnectionError){
                console.log('a db connection error ocurred: ', error.message)
            }
            else if(error instanceof QueryError){
                console.log('error excuting the db query: ', error.message)
            }

            this.resolver.internalServerError(null, 'internal server error')
        }
        
        
    }
    async getUserShippingAddresses( req:Request, res: Response){
        this.resolver.setResponse(res)
        
        console.log('req.params : ',req.params)// undefined
        const personId:number =  parseInt(req.params.personId, 10)
        try {
            const result : ResponseObject = await this.shippAddrRepo.getUserShippingAdresses(personId)
            this.sendResponse(result)
        } catch (error) {
            if(error instanceof DbConnectionError){
                console.log('a db connection error ocurred: ', error.message)
            }
            else if(error instanceof QueryError){
                console.log('error excuting the db query: ', error.message)
            }

            this.resolver.internalServerError(null, 'internal server error')
        }
    }

}