interface IValidateInputs{
    checkEmailFormat(email:string): boolean
    
}
export interface IValidateSIgnInInputs extends IValidateInputs{
    checkDefinedInputs(email: string, password: string): void
}

export interface IValidateSIgnUpInputs extends IValidateInputs{
    checkDefinedInputs(firstName:string, lastName: string, email: string, password: string):void
}