import { IValidateSIgnInInputs, IValidateSIgnUpInputs } from "./IValidateInputs";
import { MissingCredentials } from "./errors";
import { BaseValidator } from "./baseValidator";

export class SignInValidator extends BaseValidator implements IValidateSIgnInInputs {
    checkDefinedInputs(email: string, password: string): void {
        if (!email || !password) {
            throw new MissingCredentials('missing email or password');
        }
        
    }
    
}