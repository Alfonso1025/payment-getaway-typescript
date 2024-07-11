import { IShippAddrRepo } from "./Repos/IShippAddrRepo";
import { Request,Response } from "express";
import { ShippingAddress } from "./types";
import { DbConnectionError, QueryError } from "../dbconnections/errors";
import { IResolver } from "../resolver/IResolver";
export class Controller{

    private shippAddrRepo: IShippAddrRepo;
    private resolver: IResolver

    constructor(shippAddrRepo: IShippAddrRepo, resolver: IResolver) {
        this.shippAddrRepo = shippAddrRepo;
        this.resolver = resolver
    }
    async query(res:Response, result: string){
        console.log('code got to general')
        if(result === 'success') return this.resolver.success(null, result)
        else return this.resolver.internalServerError(null, result)
    }
    //post a new shipping address
    async post(req: Request, res: Response){
        
        this.resolver.setResponse(res)
        const shippingAddress: ShippingAddress = req.body.shippingAddress
        const personId: number = req.body.personId

        try {
            const result = await this.shippAddrRepo.post(shippingAddress,personId)
            this.query(res, result)
        } catch (error) {

            if(error instanceof DbConnectionError){
                console.log('a db connection error ocurred', error.message)
                this.resolver.internalServerError(error, error.message)
            }
            if(error instanceof QueryError){
                console.log('there was an error in the query')
                this.resolver.internalServerError(error,error.message)
            }
        }
        
        
    }
    async getAll(personId: number){

    }

}