import { Request, Response } from "express";
import { IShoppingCart } from "../shoppingCart/IShoppingCart";
import { IPaymentService } from "../payment/IPaymentService";


export class CheckoutController{
    constructor(private readonly shoppingCart:IShoppingCart, private readonly paymentService: IPaymentService ){}

    async createSession(req:Request, res: Response) : Promise<void>{
        try {
            this.shoppingCart.setShopItems(req.body.shoppingCart)
            const url = await this.paymentService.createUrl(['aud'], this.shoppingCart)
            res.send({url}) 
        } catch (error) {
            
            if(error instanceof Error)
            res.send(error.message)
        }
       
    }


}