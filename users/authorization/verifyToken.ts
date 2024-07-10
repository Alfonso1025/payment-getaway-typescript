import { send } from "process";
import { IJwtGenerator } from "../utils/token/IToken";
import { Request, Response } from "express";

export class VerifyTokenController{
    constructor(
        private jwtGenerator : IJwtGenerator
    ) {}
    verify(req: Request, res: Response){
        const token = req.header("token")
        if(typeof token !== 'string' || !token){
            res.status(401).send('forbbiden')  
            return
        }
        const isTokenVerified: boolean = this.jwtGenerator.verifyToken(token)
        if(isTokenVerified){
            console.log('Authorized. Token verified ')
            res.status(200).send({data : 'authorized'})
        }
    }     

}