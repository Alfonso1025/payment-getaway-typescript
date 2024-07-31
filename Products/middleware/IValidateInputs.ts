import { Product} from "../types";

export interface IValidateInputs{

    addProduct(product: Product): string
    updateQuantity(qty : number, productId : number) : string
    editPrice(producId:number, newPrice : number) : string
    editDescript(producId: number, newDescript: string) : string
    addImage(producId: number, url:string) : string
    setMainImage(newMainImageId: number, oldMainImageId: number | null):string
    deleteProduct(productId:string):string
}