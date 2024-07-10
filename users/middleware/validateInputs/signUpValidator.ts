import { IValidateSIgnInInputs, IValidateSIgnUpInputs } from "./IValidateInputs";
import { MissingCredentials, MissingRequiredField } from "./errors";
import { BaseValidator } from "./baseValidator";

export class SignUpValidator extends BaseValidator implements IValidateSIgnUpInputs {
    checkDefinedInputs(firstName: string, lastName: string, email: string, password: string): void {
        if (!firstName || !lastName || !email || !password) {
            throw new MissingRequiredField('First name, last name, email, and password are required for sign-up.');
        }
        
    }
    
}