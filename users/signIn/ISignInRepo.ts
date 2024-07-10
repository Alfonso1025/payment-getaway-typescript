import { User } from "../types"


export interface ISignInRepo{
    findUserByEmail(email: string):Promise<User>
    
}