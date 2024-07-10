import { Product } from "../types";
import { IValidateInputs } from "./IValidateInputs";
import { Request, Response, NextFunction } from "express";

export class ValidateMdlw{
    private validateInputs: IValidateInputs;
    
    constructor(validateInputs: IValidateInputs) {
        this.validateInputs = validateInputs;
       
    }
    addProduct(req: Request, res: Response, next: NextFunction){
        const product : Product = req.body
        const result = this.validateInputs.addProduct(product)
        if(result === 'all_inputs_are_valid'){
            console.log(result)
            next()
            return
        }
        else{
            console.log(result)
            res.status(400).send(result)
            return
        }
    }
    updateQuantity(req: Request, res : Response, next: NextFunction){
        const qty = req.body.qty
        const productId = req.body.productId
        const result = this.validateInputs.updateQuantity(qty,productId)
        if(result === 'all_inputs_are_valid'){
            console.log(result)
            next()
            return
        }
        else{
            console.log(result)
            res.status(400).send(result)
        }
    }
    editPrice(req:Request, res: Response, next : NextFunction){
        const productId = req.body.productId
        const newPrice = req.body.newPrice
        const result = this.validateInputs.editPrice(productId,newPrice)
        if(result === 'all_inputs_are_valid'){
            console.log(result)
            next()
            return
        }
        else{
            console.log(result)
            res.status(400).send(result)
        }
    }
    editDescript(req:Request, res: Response, next : NextFunction){
        const productId = req.body.productId
        const newDescript = req.body.newDescript
        const result = this.validateInputs.editDescript(productId,newDescript)
        if(result === 'all_inputs_are_valid'){
            console.log(result)
            next()
            return
        }
        else{
            console.log(result)
            res.status(400).send(result)
        }
    }
    
}