import { Resolver } from "../services/resolver/resolver"
import { SqlRepo } from "./Repos/sqlRepo";
import { Controller } from "./controller";
import { ResponseObject } from "../services/queryResponse/types";
import { CheckQryResultSQL } from "../services/CheckQueryResult/sql/sql";
import { DbQuerySql } from "../services/DbQueryService/DbQuerySql";






const responseObject: ResponseObject = {
    data : null,
    message : 'fail'
}


const checkQueryResult = new CheckQryResultSQL
const dbQuery = new DbQuerySql(responseObject, checkQueryResult)
const sqlRepo = new SqlRepo(dbQuery);
const resolver = new Resolver();
export const controller = new Controller(sqlRepo, resolver);  