import fs from 'fs';
import path from 'path';
import { IProduct } from "./IProduct";
import { IProductsRepo } from "./IProductsRepo";
import { ISelectedProduct } from './ISelectedProduct';
import { IOrder, IOrderItem } from '../order/IOrder';
import { Order } from '../order/Order';


export class LocalRespo implements IProductsRepo {
    
    async getBulkProductsById(productsArray:ISelectedProduct[]): Promise<IProduct[]> {
        try {
            // Read the merchandise.json file
            const merchandiseFilePath = path.join(__dirname, '..', 'merchandise.json');
            const merchandiseData = fs.readFileSync(merchandiseFilePath, 'utf-8');
            const products: IProduct[] = JSON.parse(merchandiseData);

            // Filter products based on the IDs present in productsArray
            const filteredProducts = products.filter(product =>
                productsArray.some(selectedProduct => selectedProduct.id === product.id)
            );
            

            return filteredProducts;
        } catch (error) {
            console.error("Error:", error);
            throw new Error('Failed to retrieve products');
        }
    }
   
    addQuantity(retrievedProducts: IProduct[], order: IOrder, selectedProducts: ISelectedProduct[]): void {
            selectedProducts.forEach(selectedProduct => {
                const retrievedProduct = retrievedProducts.find(product => product.id === selectedProduct.id);
                if (retrievedProduct) {
                    const orderItem: IOrderItem = {
                        product: retrievedProduct,
                        qty: selectedProduct.qty
                    };
                    order.addOrderItems(orderItem)
                }
            });
        }

        
    
}
