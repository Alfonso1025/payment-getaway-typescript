import { CreateAddressDto } from "../dtos/createAddress.dto";
import { IValidateInputs } from "./IValidateInputs";

export class ValidateInputs implements IValidateInputs{
    private errors: string[];

    constructor() {
        this.errors = [];
    }

   createAddres(createAddressDto: CreateAddressDto): string {

       const {street, city,state, unit, zipcode, country, personId} = createAddressDto
       
    
       
    
        // Validate `street` (required, string)
        if (!street || typeof street !== 'string' || street.trim().length === 0) {
          this.errors.push("Street is required and must be a non-empty string.");
        }
    
        // Validate `unit` (optional, number)
        if (unit !== undefined && (typeof unit !== 'number' || unit < 0)) {
          this.errors.push("Unit, if provided, must be a positive number.");
        }
    
        // Validate `city` (required, string)
        if (!city || typeof city !== 'string' || city.trim().length === 0) {
          this.errors.push("City is required and must be a non-empty string.");
        }
    
        // Validate `state` (required, string)
        if (!state || typeof state !== 'string' || state.trim().length === 0) {
          this.errors.push("State is required and must be a non-empty string.");
        }
    
        // Validate `country` (required, string)
        if (!country || typeof country !== 'string' || country.trim().length === 0) {
          this.errors.push("Country is required and must be a non-empty string.");
        }
    
        // Validate `zipcode` (required, number, positive, length between 4 and 10)
        if (
          typeof zipcode !== 'number' ||
          zipcode <= 0 ||
          zipcode.toString().length < 4 ||
          zipcode.toString().length > 10
        ) {
          this.errors.push("Zipcode must be a positive number with a length between 5 and 10 digits.");
        }
    
        // Validate `personId` (required, number, positive)
        if (!personId || typeof personId !== 'number' || personId <= 0) {
          this.errors.push("Person ID is required and must be a positive number.");
        }
    
        // Return errors if any
        if (this.errors.length > 0) {
          return `Validation failed: ${this.errors.join(" ")}`;
        }
    
        // If no errors, return success message
        return "all_inputs_are_valid";
   }
   //personId is a string because it comes from req.params.
   //personId will be parsed into a number in the controller. 
   getAddressesByPersonId(personId: string):string{
    if (!personId || typeof personId !== 'string' || personId.length <= 0) {
        this.errors.push("Person ID is required in the route parameters.");
      }
    // Return errors if any
    if (this.errors.length > 0) {
        return `Validation failed: ${this.errors.join(" ")}`;
      }
  
      // If no errors, return success message
      return "all_inputs_are_valid";
   }
}