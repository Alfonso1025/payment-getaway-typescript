
import { IResolver } from "../../services/resolver/IResolver";
import { IJwtService } from "../../services/token/IJwt";
import { Request, Response,NextFunction } from "express";

export class Authorization{
    constructor(
        private jwtService : IJwtService,
        private resolver : IResolver
    ){}
    authorize(req:Request, res: Response, next: NextFunction){
        try {
            this.resolver.setResponse(res)
            
            const token = req.header('token')
            console.log('this is the token')
            const result = this.jwtService.isTokenValid(token)
            if(!result){
                return this.resolver.forbidden(null, 'invalid token')
                
            }
            
            next()
        } catch (error){ 
            if(error instanceof Error){
                this.resolver.internalServerError(null, error.message)
                
            }
           
        }
       
    }
}