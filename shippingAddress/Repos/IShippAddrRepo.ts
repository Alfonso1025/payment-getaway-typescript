import { ResponseObject } from "../../services/queryResponse/types";
import { ShippingAddress } from "../types";
import { CreateAddressDto } from "../dtos/createAddress.dto";

export interface IShippAddrRepo{
    
    addShippingAddress(createAddressDto : CreateAddressDto): Promise<ResponseObject>
    getUserShippingAdresses(personId : number) : Promise<ResponseObject>
    getShippingAddressById(ShopAddId: number):Promise<ResponseObject>
    delete(shippAddrId : number):Promise<ResponseObject>

    
}