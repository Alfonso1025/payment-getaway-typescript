import { PasswordEncryptor } from "../utils/passwordEncryption/passwordEncrypt"
import { JWTService } from "../../services/token/jwt";
import { SignInController } from "./signInController"
import { SignInSqlRepo } from "./sInSqlRepo"
import dotenv from 'dotenv';


dotenv.config();

const signInSqlRepo = new SignInSqlRepo
const passwordEncryptor = new PasswordEncryptor()

const jwtGenerator = new JWTService()
export const signInController = new SignInController(signInSqlRepo, passwordEncryptor,jwtGenerator)
