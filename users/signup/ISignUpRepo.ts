import { User } from "../types"


export interface ISignUpRepo{
    doesUserAlreadyExist(email: string):Promise<boolean>
    insertUser(user: User):void
}