import { VerifyTokenController } from "./verifyToken";
import { JWT } from "../utils/token/jwt";

const jwtGenerator = new JWT()
export const verifyTokenController = new VerifyTokenController(jwtGenerator)

