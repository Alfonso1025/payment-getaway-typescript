import { Product, imageKey } from "../types";

export interface IValidateInputs{

    addProduct(product: Product): string
    updateQuantity(qty : number, productId : number) : string
    editPrice(producId:number, newPrice : number) : string
    editDescript(producId: number, newDescript: string) : string
    addImage(producId: number, url:imageKey) : string
}