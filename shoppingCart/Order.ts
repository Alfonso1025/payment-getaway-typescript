import { IShopCartItem } from "./IShoppingCart";
import { IShoppingCart } from "./IShoppingCart";

export class ShoppingCart implements IShoppingCart {
    shoppoingCartItems:IShopCartItem[];

    constructor(shoppingCartItems: IShopCartItem[]) {
        this.shoppoingCartItems = shoppingCartItems;
    }

   
    
}
