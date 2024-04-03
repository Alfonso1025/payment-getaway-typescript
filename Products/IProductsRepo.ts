import { IProduct } from "./IProduct"
import { ISelectedProduct } from "./ISelectedProduct"
export interface IProductsRepo{
    getBulkProductsById(productsArray:ISelectedProduct[]):Promise<IProduct[]>
}