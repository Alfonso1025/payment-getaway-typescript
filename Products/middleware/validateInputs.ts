import { Product} from "../types";
import { IValidateInputs } from "./IValidateInputs";

export class ValidateInputs implements IValidateInputs{
    isDefined(input:any):boolean{
        return input !== undefined && input !== null && input !== "";
    }
    addProduct(product: Product):string{

        const { product_name, price, category, product_description } = product;
        if(typeof product_name !== 'string' || !this.isDefined(product_name)) return 'product name must be a string'
        if(typeof price !== 'number' || !this.isDefined(price)) return 'product price must be a number'
        if(typeof category !== 'number' || !this.isDefined(category)) return 'product category must be a number'
        if(typeof product_description !== 'string'|| !this.isDefined(product_description)) return 'product description must be a string'
        

        return 'all_inputs_are_valid'
    }
    updateQuantity(qty: number, productId: number): string {
        if(typeof qty !== 'number' || !this.isDefined(qty)) return 'the quantity must be a number'
        if(typeof productId !== 'number' || !this.isDefined(productId)) return 'the product id must be a number'
        return 'all_inputs_are_valid'
    }
    editPrice(producId: number, newPrice: number): string {
        console.log('this is the productId',producId)
        if(typeof producId !== 'number' || !this.isDefined(producId)) return 'the product id must be a number'
        if(typeof newPrice !== 'number' || !this.isDefined(newPrice)) return 'the new price must be a number'
        return 'all_inputs_are_valid'
    }
    editDescript(producId: number, newDescript: string): string {
        if(typeof producId !== 'number' || !this.isDefined(producId)) return 'the product id must be a number'
        if(typeof newDescript !== 'string' || !this.isDefined(newDescript)) return 'the new description must be a string'
        return 'all_inputs_are_valid'
    }
    addImage(producId: number, sku : string):string{
        if(typeof producId !== 'number' || !this.isDefined(producId)) return 'the product id must be a number'
        if(typeof sku !== 'string' || !this.isDefined(sku)) return 'the sku must be a string'
        return 'all_inputs_are_valid'
    }
    setMainImage(newMainImageId: number, oldMainImageId: number | null): string {
        if(typeof newMainImageId !== 'number' || !this.isDefined(newMainImageId)) return ' the new image id must be a number'
        if(typeof oldMainImageId !== 'number' || !this.isDefined(oldMainImageId)) return 'the old image id must be a number'
        return 'all_inputs_are_valid'
    }
    deleteProduct(productId: string):string{
         if(typeof productId !== 'number' || !this.isDefined(productId)) return 'the product id must be a number'
         return 'all_inputs_are_valid'
    }
}