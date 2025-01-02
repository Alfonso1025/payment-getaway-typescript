import { CreateAddressDto } from "../dtos/createAddress.dto";

export interface IValidateInputs{
    createAddres(createAddressDto: CreateAddressDto):string
    getAddressesByPersonId(personId: string):string
}