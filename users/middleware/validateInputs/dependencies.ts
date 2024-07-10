import { ValidateInputs } from "./validateInputs";
import { SignInValidator } from "./signInvalidator";
import { SignUpValidator } from "./signUpValidator";

const signInValidator = new SignInValidator()
const signUpValidator = new SignUpValidator()
export const validateInputs = new ValidateInputs(signInValidator,signUpValidator)

