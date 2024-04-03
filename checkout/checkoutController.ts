import { Request, Response } from "express";
import { IProductsRepo } from "../Products/IProductsRepo";
import { IProduct } from "../Products/IProduct";
import { ISelectedProduct } from "../Products/ISelectedProduct";

export class CheckoutController{
    constructor(private readonly productRepo : IProductsRepo){}

    async getBulkProductsById(req:Request, res: Response){
        const productsArray: ISelectedProduct[] = req.body.selectedProducts
        const products = await this.productRepo.getBulkProductsById(productsArray)

        return res.json({data: products})
    }


}