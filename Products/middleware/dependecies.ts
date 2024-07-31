import { Resolver } from "../../services/resolver/resolver";
import { ValidateInputs } from "./validateInputs";
import { ValidateMdlw } from "./validateMldw";
const validateInputs = new ValidateInputs
const resolver = new Resolver
export const validateMldw = new ValidateMdlw(validateInputs,resolver)