import { PasswordEncryptor } from "../utils/passwordEncryption/passwordEncrypt"
import { SignUpController } from "./signUpController"
import { SignUpSqlRepo } from "./sUpSqlRepo"


const signUpSqlRepo = new SignUpSqlRepo()
const passwordEncryptor = new PasswordEncryptor()
export const signUpController = new SignUpController(signUpSqlRepo,passwordEncryptor)
