import { Product,insertedId } from "./types"
import { ResponseObject } from "../queryResponse/types"


export interface IProductsRepo{

   getAll():  Promise<ResponseObject>
   post(product:Product): Promise<ResponseObject>
   addQuantity(qty:number,productId:number):Promise<ResponseObject>
   reduceQuantity(qty:number, producId: number) :Promise<ResponseObject>
   editPrice(productId:number, newPrice: number): Promise<ResponseObject>
   editDescription(productId : number, newDescript : string): Promise<ResponseObject>
   addImage(productId : number, imageName : string) : Promise<ResponseObject>
   deleteImage(imageId: number):Promise<string>
   selectMainImage(newMainImgId : number, oldMainImgId:number|null) : Promise<ResponseObject>
   deleteProduct(producId: number): Promise<ResponseObject>


}