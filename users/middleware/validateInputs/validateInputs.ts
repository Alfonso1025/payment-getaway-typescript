import { IValidateSIgnInInputs, IValidateSIgnUpInputs } from "./IValidateInputs";
import { MissingCredentials, MissingRequiredField } from "./errors";
import { Request, Response, NextFunction } from "express";

export class ValidateInputs{ 

    private signInValidator: IValidateSIgnInInputs;
    private signUpValidator: IValidateSIgnUpInputs;

    constructor(signInValidator: IValidateSIgnInInputs,signUpValidator: IValidateSIgnUpInputs) {
        this.signInValidator = signInValidator;
        this.signUpValidator = signUpValidator;
    }

    validateSignIn(req:Request, res: Response, next: NextFunction ){
        try {
            //validate if the email and password are defined
            this.signInValidator.checkDefinedInputs(req.body.email,req.body.password)
            //validate strong password
                /*not implemented yet */
            //validate that the email has a valid format
            const isFormatValid = this.signInValidator.checkEmailFormat(req.body.email)
            if(!isFormatValid){
                console.log('The email format is invalid')
                res.status(400).send('The email format is invalid')
                return 
            }  
            
            next()
        
        } catch (error) {
            if(error instanceof MissingCredentials){
                console.log('error validating email and password: ',error.message)
                res.status(401).send('missing credentials')
                return
            }
        }
        
    }
    validateSignUp(req:Request, res: Response, next: NextFunction ){
        try {
            //validate if the email and password are defined
            const firstName: string = req.body.firstName
            const lastName: string = req.body.lastName
            const email : string = req.body.email
            const password: string = req.body.password
            this.signUpValidator.checkDefinedInputs(firstName,lastName,email,password)
            //validate strong password
                /*not implemented yet */
            //validate that the email has a valid format
            const isFormatValid = this.signUpValidator.checkEmailFormat(email)
            if(!isFormatValid){
                console.log('The email format is invalid')
                res.status(400).send('The email format is invalid')
                return 
            }  
            
            next()
        
        } catch (error) {
            if(error instanceof MissingRequiredField){
                console.log('missing a required field for sign up')
                res.status(400).send('missing a required field for signUp')
                return
            }
        }

    }
}

