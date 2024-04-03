import { IProduct } from "../Products/IProduct"
export interface IPaymentService{
    createUrl(paymentMethods: string[], products: IProduct): string
}