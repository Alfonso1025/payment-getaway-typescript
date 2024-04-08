import { IShoppingCart } from "../shoppingCart/IShoppingCart";
import { IPaymentService } from "./IPaymentService";
import { ILineItems } from "./IStripeLineItems";
import Stripe from "stripe";
const stripeKey = process.env.STRIPE_PRIVATE_KEY

if (!stripeKey) {
    throw new Error('Stripe private key is not defined in environment variables.');
} 
const stripe = new Stripe(stripeKey)

export class StripeService implements IPaymentService{

   
    formatLineItems(shoppingCart: IShoppingCart, currency:string): ILineItems[]{
        const lineItems: ILineItems[] =  shoppingCart.shoppoingCartItems.map( shopItem =>{
            return{
                price_data : {
                    currency,
                    product_data: {
                        name : shopItem.product.name
                    },
                    unit_amount : shopItem.product.price
                },
                quantity : shopItem.qty
            }
        }

        )
        return lineItems
    }
    async createUrl(paymentMethods: string[], shoppingCart: IShoppingCart): Promise<string> {
       try {

            const lineItems = this.formatLineItems(shoppingCart, 'aud')
            const session = await stripe.checkout.sessions.create(//I think the error happens here
            {
                payment_method_types : ['card'],
                mode : 'payment',
                line_items : lineItems,
                success_url : `${process.env.PORT_CLIENT}/success.html`,
                cancel_url :  `${process.env.PORT_CLIENT}/cancel.html`
            }
           )
            if(session.url){
                return session.url
            }
            throw new Error('failed to produce a url') 
        
        
       }
        catch (error) {
            if(error instanceof Error)
            throw new Error(error.message)
       }
       return 'failed to produce a url'
        
    }
}