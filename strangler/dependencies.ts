import { Producer } from "./producer";
import { ProductsStrangler } from "./products.strangler";

const producer = new Producer
export const productSTrangler = new ProductsStrangler(producer)
