import { ShippingAddress } from "../types";

export interface IShippAddrRepo{
    post(ShippingAddress: ShippingAddress,personId:number): Promise<string>
    get(personId : string) : Promise<string>
    edit(field: string, value: any): Promise<string>
    delete(shippAddrId : number):Promise<string>
    
}