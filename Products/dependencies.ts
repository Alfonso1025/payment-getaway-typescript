import { S3 } from "./imageService/s3"
import { ProductsController } from "./productsController"
import { SqlProductsRepo } from "./sqlRepo"
import { ResponseObject } from "../queryResponse/types"
import { Resolver } from "../resolver/resolver"



const responseObject: ResponseObject = {
    data : null,
    message : 'fail'
}
const sqlProductsRepo = new SqlProductsRepo(responseObject)
const s3 = new S3
const resolver = new Resolver
export const productsController = new ProductsController(sqlProductsRepo, s3, resolver)

