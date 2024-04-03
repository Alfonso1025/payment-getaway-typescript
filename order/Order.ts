import { IOrder } from "./IOrder";
import { IOrderItem } from "./IOrder";

export class Order implements IOrder {
    orderItems: IOrderItem[];

    constructor(orderItems: IOrderItem[] = []) {
        this.orderItems = orderItems;
    }

   
    addOrderItems(orderItem: IOrderItem): void {
        this.orderItems.push(orderItem);
    }
}
