import { IProduct } from "../Products/IProduct"

export interface IOrderItem{
    product : IProduct
    qty : number
}
export interface IOrder{
   orderItems: IOrderItem[]
   addOrderItems(orderItem: IOrderItem): void
}
