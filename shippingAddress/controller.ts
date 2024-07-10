import { IShippAddrRepo } from "./Repos/IShippAddrRepo";
import { Request,Response } from "express";
import { ShippingAddress } from "./types";
import { DbConnectionError } from "../dbconnections/errors";
import { IResolver } from "../resolver/IResolver";
export class Controller{
    private shippAddrRepo: IShippAddrRepo;
    private resolver: IResolver

    constructor(shippAddrRepo: IShippAddrRepo, resolver: IResolver) {
        this.shippAddrRepo = shippAddrRepo;
        this.resolver = resolver
    }
    async general(res:Response, result: string){
        this.resolver.setResponse(res)
        if(result === 'success') return this.resolver.success(null, result)
        else return this.resolver.internalServerError(null, result)
    }
    //post a new shipping address
    async post(req: Request, res: Response){
      
        const shippingAddress: ShippingAddress = req.body
        try {
            const result = await this.shippAddrRepo.post(shippingAddress)
            this.general(res, result)
        } catch (error) {
            if(error instanceof DbConnectionError){
                console.log('a db error ocurred', error.message)
                this.resolver.internalServerError(error, error.message)
            }
        }
        
        
    }
    async getAll(personId: number){

    }

}