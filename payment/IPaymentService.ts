
import { IShoppingCart } from "../shoppingCart/IShoppingCart"
export interface IPaymentService{
    createUrl(paymentMethods: string[], shoppingCart: IShoppingCart): Promise<string>
}