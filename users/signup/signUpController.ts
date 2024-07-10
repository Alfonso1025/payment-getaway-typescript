import { ISignUpRepo } from "./ISignUpRepo";
import { Request, Response } from "express";
import { User } from "../types";
import { DbConnectionError } from "../../dbconnections/errors";
import { IPasswordEncryption } from "../utils/passwordEncryption/IPasswEncrypt";

export class SignUpController {

    constructor(
               private signUpSqlRepo: ISignUpRepo,
               private passwordEncryptor : IPasswordEncryption
               ) {}

    async findIfUserExist(email: string):Promise<boolean>{
        
            const result:boolean = await this.signUpSqlRepo.doesUserAlreadyExist(email)
            return result   
        
    }
    
    async signUpUser(req: Request, res: Response){
        
        const newUser : User = req.body
        
        try {
            const hashedPassword = await this.passwordEncryptor.encryptPassword(newUser.user_password)
            newUser.user_password = hashedPassword
            
            const checkIfUserExist = await this.findIfUserExist(newUser.email)
            
            
        
            if(checkIfUserExist){
                console.log('the user already exist on the db. Try login')
                res.status(400).send({message : 'user already exist'})
                return
            } 
            //insert user to db
            console.log('New user, proceed to insert to db')
             await this.signUpSqlRepo.insertUser(newUser)
             res.send({message:'user inserted'})
             return  

         } 
         catch (error) {
            if(error instanceof DbConnectionError){
                console.log(error.message)
                res.status(500).send('db connection error')
                return
                
            }
            else{
                console.log(error)
                res.status(500).send('internal server error')
            }
            
        } 
            
        
        
    }
    
}
