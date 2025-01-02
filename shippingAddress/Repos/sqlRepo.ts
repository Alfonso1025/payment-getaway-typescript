import { ShippingAddress } from "../types";
import { IShippAddrRepo } from "./IShippAddrRepo";
import {ResultSetHeader } from 'mysql2';
import { QueryError } from "../../dbconnections/errors";
import db from "../../dbconnections/sql/sql";
import { shippAddrRouter } from "../routes";
import { ResponseObject } from "../../services/queryResponse/types";
import { IDbQuery } from "../../services/DbQueryService/IDbQuery";
import { CreateAddressDto } from "../dtos/createAddress.dto";
export class SqlRepo implements IShippAddrRepo{

    constructor(
        
        private dbQuery : IDbQuery
    
    ){}
    async addShippingAddress(createAddressDto: CreateAddressDto): Promise<ResponseObject> {
      
      const {street, city, state, zipcode, unit, personId} = createAddressDto
      
      const query = 'INSERT INTO shipping_addresses (street, city, state,zipcode,unit,person_id) VALUES (?,?,?,?,?,?) ';
      return await this.dbQuery.post(query, [street,city,state,zipcode,unit,personId])
    
      
    }
    async getUserShippingAdresses(personId: number): Promise<ResponseObject> {
          const query = 'SELECT * FROM shipping_addresses WHERE person_id = ?'
          return await this.dbQuery.get(query,[personId])
        
    }
    async getShippingAddressById(ShopAddId: number): Promise<ResponseObject> {
        return await this.dbQuery.get('',null)
    }
    async edit(field: string, value: any): Promise<string> {
          return await 'pass'
    }
    async delete(shippAddrId: number): Promise<ResponseObject> {
          return await this.dbQuery.delete('',[])
    }
}