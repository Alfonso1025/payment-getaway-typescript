import { Resolver } from "../services/resolver/resolver"
import { SqlRepo } from "./Repos/sqlRepo";
import { Controller } from "./controller";
import { Response } from "express";
const responseObject = {
    data : null,
    message : 'failed'
}
const sqlRepo = new SqlRepo(responseObject);
const resolver = new Resolver();
export const controller = new Controller(sqlRepo, resolver);