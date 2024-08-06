
import { Request, Response } from "express";
import { IResolver } from "../../services/resolver/IResolver";

export class VerifyTokenController{
    constructor(

        private resolver : IResolver
    ) {}
    verify(req: Request, res: Response){
        this.resolver.success(true,'token verified')
    }   
    
} 