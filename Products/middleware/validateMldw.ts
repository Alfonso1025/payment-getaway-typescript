import { IResolver } from "../../services/resolver/IResolver";
import { Product } from "../types";
import { IValidateInputs } from "./IValidateInputs";
import { Request, Response, NextFunction } from "express";

export class ValidateMdlw{
    private validateInputs: IValidateInputs;
    private resolver : IResolver
    
    constructor(validateInputs: IValidateInputs, resolver : IResolver) {
        this.validateInputs = validateInputs;
        this.resolver = resolver
        
       
    }
    verifyResult(result : string, next:NextFunction){
        if(result === 'all_inputs_are_valid'){
            console.log(result)
            next()
            return
        }
        else{
            console.log(result)
            return this.resolver.badRequest(null,result)
        }
    }
    addProduct(req: Request, res: Response, next: NextFunction){
        this.resolver.setResponse(res)
        const product : Product = req.body
        const result = this.validateInputs.addProduct(product)
        this.verifyResult(result, next)
    }
    updateQuantity(req: Request, res : Response, next: NextFunction){
        const qty = req.body.qty
        const productId = req.body.productId
        const result = this.validateInputs.updateQuantity(qty,productId)
        this.verifyResult(result, next)
    }
    editPrice(req:Request, res: Response, next : NextFunction){
        const productId = req.body.productId
        const newPrice = req.body.newPrice
        const result = this.validateInputs.editPrice(productId,newPrice)
        this.verifyResult(result, next)
    }
    editDescript(req:Request, res: Response, next : NextFunction){
        const productId = req.body.productId
        const newDescript = req.body.newDescript
        const result = this.validateInputs.editDescript(productId,newDescript)
        this.verifyResult(result, next)
    }
    setMainImage(req: Request, res: Response, next: NextFunction){
        const {oldMainImageId, newMainImageId} = req.body
        const result = this.validateInputs.setMainImage(newMainImageId, oldMainImageId)
        this.verifyResult(result, next)
    }
    
}