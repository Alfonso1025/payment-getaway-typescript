import { CheckoutController } from "./checkoutController";
import { ShoppingCart } from "../shoppingCart/shoppingcart";
import { StripeService } from "../payment/stripeService";

const shoppingCart = new ShoppingCart()
const stripeService = new StripeService()
export const checkoutController = new CheckoutController(shoppingCart, stripeService)