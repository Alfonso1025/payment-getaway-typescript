import { IProduct } from "../Products/types"

export interface IShopCartItem{
    product : IProduct
    qty : number
}
export interface IShoppingCart{
   shoppoingCartItems: IShopCartItem[]
   setShopItems(arrayOfShoppItemObjects: IShopCartItem[]): void
   
}
