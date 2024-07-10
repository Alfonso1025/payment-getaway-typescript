import { Resolver } from "../resolver/resolver"
import { SqlRepo } from "./Repos/sqlRepo";
import { Controller } from "./controller";
import { Response } from "express";
const sqlRepo = new SqlRepo;
const resolver = new Resolver();
export const controller = new Controller(sqlRepo, resolver);