import { Resolver } from "../../services/resolver/resolver";
import { JWTService } from "../../services/token/jwt";
import { Authorization } from "./authorization";

const resolver = new Resolver()
const jwtService = new JWTService()
export const authorization = new Authorization(jwtService, resolver) 