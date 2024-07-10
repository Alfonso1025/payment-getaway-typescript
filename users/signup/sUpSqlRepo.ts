import { ISignUpRepo } from "./ISignUpRepo";
import { User } from "../types";
import db from "../../dbconnections/sql/sql";
import { DbConnectionError } from "../../dbconnections/errors";

export class SignUpSqlRepo implements ISignUpRepo{

    async doesUserAlreadyExist(email: string): Promise<boolean> {
        try {
            
            const checkUserQuery = 'select * from person where email = ? limit 1';
            const values = [email];
    
            
            const resultPromise = await new Promise((resolve, reject) => {
                db.query(checkUserQuery, values, (err, result) => {
                    if (err) {
                        //console.error('Error querying the database:', err);
                        reject(new Error(err.message));
                    } else {
                        resolve(result);
                    }
                });
            });
    
           
    
            const userExists = Array.isArray(resultPromise) && resultPromise.length > 0;
            console.log('User exists:', userExists);
    
            return userExists;

        } catch (error) {
           
            if(error instanceof Error)
            throw new Error(error.message)
            return false
        }
        
    
    }
    async insertUser(user: User){
        try {
            const storeProcedure = 'CALL InsertUserWithPerson(?, ?, ?, ?)'
            const values = [user.firstName, user.lastName, user.email, user.user_password]
            return new Promise((resolve, reject)=>{
                db.query(storeProcedure,values, (err, result)=>{
                    if(err){
                        
                        reject(new DbConnectionError(err.message));
                    }   
                    resolve(result)
                })
            })
            
          
        } catch (error) {
            if(error instanceof Error){
                console.log('we catched an error here')
                throw new Error(error.message)
            }
        }
    }
}