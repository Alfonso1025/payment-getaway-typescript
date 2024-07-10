import { ISignInRepo } from "./ISignInRepo";
import { User } from "../types";
import { UserNotFoundError } from "./errors";
import { DbConnectionError } from "../../dbconnections/errors";
import db from "../../dbconnections/sql/sql";

export class SignInSqlRepo implements ISignInRepo{

    

     findUserByEmail(email: string): Promise<User>  {

        const checkUserQuery = 'select user_id, first_name, last_name, email,user_password from person join users on person.person_id = users.user_id where email = ? limit 1';
        const values = [email];
        
        return  new Promise((resolve, reject) => {
            
            db.query(checkUserQuery, values, (err, result) => {
                if (err) {
                    //console.error('Error querying the database:', err);
                    console.log('there was an error')
                    reject(new DbConnectionError(err.message));
                } 
                    if(Array.isArray(result) && result.length > 0){
                        //console.log('this is the result',result[0])
                        
                        resolve(result[0] as User);
                     }else{
                        reject(new UserNotFoundError('user not found'))
                     }
            });
        });
        
       
        

    }
}