import { ResponseObject } from "../../services/queryResponse/types";
import { ShippingAddress } from "../types";

export interface IShippAddrRepo{
    
    insertShoppingAddress(ShippingAddress: ShippingAddress,personId:number): Promise<ResponseObject>
    getUserShoppingAdresses(personId : number) : Promise<ResponseObject>
    getShoppingAddressById(ShopAddId: number):Promise<ResponseObject>
    delete(shippAddrId : number):Promise<ResponseObject>

    
}