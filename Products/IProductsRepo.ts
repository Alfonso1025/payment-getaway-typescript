import { Product,insertedId } from "./types"
import { imageKey } from "./imageService/types"


export interface IProductsRepo{

   getAllProducts():  Promise<Product[]>
   addProduct(product:Product): Promise<insertedId>
   addQuantity(qty:number,productId:number):Promise<string>
   reduceQuantity(qty:number, producId: number) :Promise<string>
   editPrice(productId:number, newPrice: number): Promise<string>
   editDescription(productId : number, newDescript : string): Promise<string>
   addImage(productId : number, imageName : string) : Promise<insertedId>
   deleteImage(imageId: number):Promise<string>
   selectMainImage(newMainImgId : number, oldMainImgId:number|null) : Promise<string>
   deleteProduct(producId: number): Promise<string>


}