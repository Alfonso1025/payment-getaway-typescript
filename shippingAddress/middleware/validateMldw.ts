import { IResolver } from "../../services/resolver/IResolver";
import { CreateAddressDto } from "../dtos/createAddress.dto";

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
    createAddress(req: Request, res: Response, next: NextFunction){
        this.resolver.setResponse(res)
        const createAddressDto :CreateAddressDto = req.body
        const result = this.validateInputs.createAddres(createAddressDto)
        this.verifyResult(result, next)
    }
    getPersonAddresses(req: Request, res:Response, next: NextFunction){
        this.resolver.setResponse(res)
        const personId = req.params.personId
        
        const result = this.validateInputs.getAddressesByPersonId(personId)
        this.verifyResult(result, next)
    }
   
    
}