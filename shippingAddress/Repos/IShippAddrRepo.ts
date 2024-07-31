import { ResponseObject } from "../../services/queryResponse/types";
import { ShippingAddress } from "../types";

export interface IShippAddrRepo{
    post(ShippingAddress: ShippingAddress,personId:number): Promise<ResponseObject>
    get(personId : string) : Promise<string>
    edit(field: string, value: any): Promise<string>
    delete(shippAddrId : number):Promise<string>
    
}