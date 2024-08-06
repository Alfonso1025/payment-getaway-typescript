import { VerifyTokenController } from "./verifyToken";
import { Resolver } from "../../services/resolver/resolver";


const resolver = new Resolver
export const verifyTokenController = new VerifyTokenController(resolver)

