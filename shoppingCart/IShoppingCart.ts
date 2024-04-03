import { IProduct } from "../Products/IProduct"

export interface IShopCartItem{
    product : IProduct
    qty : number
}
export interface IShoppingCart{
   shoppoingCartItems: IShopCartItem[]
   
}
