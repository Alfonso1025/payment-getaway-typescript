import { S3 } from "./imageService/s3"
import { ProductsController } from "./productsController"
import { SqlProductsRepo } from "./sqlRepo"
import { ResponseObject } from "../services/queryResponse/types"
import { Resolver } from "../services/resolver/resolver"
import { CheckQryResultSQL } from "../services/CheckQueryResult/sql/sql"
import { DbQuerySql } from "../services/DbQueryService/DbQuerySql"



const responseObject: ResponseObject = {
    data : null,
    message : 'fail'
}

const checkQueryResult = new CheckQryResultSQL
const dbQuery = new DbQuerySql(responseObject, checkQueryResult)
const sqlProductsRepo = new SqlProductsRepo(dbQuery)
const s3 = new S3
const resolver = new Resolver
export const productsController = new ProductsController(sqlProductsRepo, s3, resolver)

