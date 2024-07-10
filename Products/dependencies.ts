import { S3 } from "./imageService/s3"
import { ProductsController } from "./productsController"
import { SqlProductsRepo } from "./sqlRepo"

const sqlProductsRepo = new SqlProductsRepo()
const s3 = new S3
export const productsController = new ProductsController(sqlProductsRepo, s3)

