import { ResponseObject } from "../queryResponse/types";

export interface IDbQuery{
    get(query : string, values: any[]|null):Promise<ResponseObject>
    post(query : string, values: any[]): Promise<ResponseObject>
    put(query: string, values: any[]):Promise<ResponseObject>
    delete(query: string, values: any[]):Promise<ResponseObject>

}