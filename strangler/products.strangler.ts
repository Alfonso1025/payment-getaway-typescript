import { Request, Response } from "express";
import { Producer } from "./producer";
export class ProductsStrangler{
    constructor(
        private producer: Producer,
        private queue = 'inventory-queue'
    ){}
    getById(req:Request, res:Response){
        const productId = req.params.id
        console.log('hitting the route')
        console.log('this is the id: ', productId)
        try {
            this.producer.sendMessage(this.queue, 'get-by-id',productId) 
        } catch (error) {
            console.log(error)
        }
         
    } 
    addQty(req:Request, res:Response){
        const qty = req.body.qty
        const productId : number = req.body.productId
        const addqtyObject = {qty, productId} 
        try {
            this.producer.sendMessage(this.queue,'add-qty',addqtyObject)
        } catch (error) {
            console.log(error)
        }
    }
}