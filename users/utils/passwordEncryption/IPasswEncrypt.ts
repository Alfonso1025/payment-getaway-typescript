export interface IPasswordEncryption{
    encryptPassword(password: string): Promise<string>
    comparePasswords(hashedPassword: string, userInputPassword:string): Promise<boolean>
}