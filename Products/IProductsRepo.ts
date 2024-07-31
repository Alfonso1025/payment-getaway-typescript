import { Product,insertedId } from "./types"
import { ResponseObject } from "../services/queryResponse/types"


export interface IProductsRepo{

   getAll():  Promise<ResponseObject>
   addProduct(product:Product): Promise<ResponseObject>
   addQuantity(qty:number,productId:number):Promise<ResponseObject>
   reduceQuantity(qty:number, producId: number) :Promise<ResponseObject>
   editPrice(productId:number, newPrice: number): Promise<ResponseObject>
   editDescription(productId : number, newDescript : string): Promise<ResponseObject>
   addImage(productId : number, imageName : string) : Promise<ResponseObject>
   deleteImage(imageId: number):Promise<string>
   deleteImages(productId: number): Promise<ResponseObject>
   getAssociatedImages(producId:number):Promise<ResponseObject>
   selectMainImage(newMainImgId : number, oldMainImgId:number|null) : Promise<ResponseObject>
   deleteProduct(producId: number): Promise<ResponseObject>


}