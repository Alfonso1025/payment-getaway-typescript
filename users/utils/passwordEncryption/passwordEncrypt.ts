import { IPasswordEncryption } from "./IPasswEncrypt";
import bcrypt from "bcrypt";


export class PasswordEncryptor implements IPasswordEncryption{

    async encryptPassword (password: string): Promise<string>{
        const saltRound =10
        const salt= await bcrypt.genSalt(saltRound)
        const bcryptPassword= await bcrypt.hash(password, salt)
        
        return bcryptPassword
    }
    async comparePasswords(hashedPassword: string, userInputPassword:string): Promise<boolean> {
       return await bcrypt.compare(userInputPassword,hashedPassword)
    }
}