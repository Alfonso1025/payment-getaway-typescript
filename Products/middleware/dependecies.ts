import { ValidateInputs } from "./validateInputs";
import { ValidateMdlw } from "./validateMldw";
const validateInputs = new ValidateInputs
export const validateMldw = new ValidateMdlw(validateInputs)