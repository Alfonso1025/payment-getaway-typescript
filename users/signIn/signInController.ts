import {ISignInRepo} from './ISignInRepo'
import { Request, Response } from "express";
import { User } from "../types";
import { DbConnectionError } from '../../dbconnections/errors';
import {UserNotFoundError } from './errors';
import { IPasswordEncryption } from '../utils/passwordEncryption/IPasswEncrypt';
import { IJwtService } from '../../services/token/IJwt';

export  class SignInController{
    constructor(
        private signInRepo: ISignInRepo,
        private passwordEncryptor : IPasswordEncryption,
        private jwtGenerator : IJwtService
    ) {}

   
    
    async signInUser(req:Request, res:Response){
        
        try {
            const email:string = req.body.email
            const password:string = req.body.password

            const result: User = await this.signInRepo.findUserByEmail(email)
            if(result.user_id){

                console.log('this the result :', result)
                const isPasswordValid: boolean = await this.
                passwordEncryptor.comparePasswords(result.user_password, password)
                if(!isPasswordValid){
                    console.log('the password provided by the user does not match the stored in the db')
                    res.status(401).send('invalid credentials')
                }
                //produce jwt
           
                const token = this.jwtGenerator.createToken(result.user_id)
                if(token === null) {
                        res.status(500).send('there was a problem producing the token')
                        return
                    }
                res.status(200).send({user: result, token : token})
                return
            
            }
            console.log('the user id is undefined. ')
            res.status(500).send('internal server error')
           
           
        } catch (error) {
            if(error instanceof DbConnectionError){
                console.log('a db conection error')
                res.status(500).send(error.message)
                return
            } 
            if(error instanceof UserNotFoundError){
                console.log('an user not found error')
                res.status(400).send(error.message)
                return 
                
            } 
            else{
                console.log(error)
                res.status(500).send('internal server error')
                return 
            }
            
            
        }
        
    }
}