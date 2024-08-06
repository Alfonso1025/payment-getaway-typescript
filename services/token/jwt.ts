import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IJwtService } from "./IJwt";

dotenv.config();


export class JWTService implements IJwtService{

    
    createToken(userId: number): string|null {
        if(typeof process.env.JWT_SECRET !== 'string'){
            console.log('the jwt_secret must be string but got undefined')
            return null
        }
        if(!userId){
            console.log('the user id is must be defined to produce a token')
            return null
        }
        const payload={ user:userId}
        const jwt_secret: string = process.env.JWT_SECRET
        return jwt.sign(payload, jwt_secret,{expiresIn:"10h"})    
        
    }
    isTokenValid(token: string|undefined): boolean {
        console.log('this is the token',token)
        if(typeof process.env.JWT_SECRET !== 'string'){
            //throw custom error
            console.log('the jwt_secret must be string but got undefined')
            throw new Error('the JWT secret must be a string')
            
        }
        if(!token){
            
            console.log('the token is undefined')
            
            return false
        }
        
        const jwt_secret: string = process.env.JWT_SECRET
        const payload= jwt.verify(token, jwt_secret)
        
        return true
        
    }
}