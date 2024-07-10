import { Response } from "express"
import { IResolver } from "./IResolver"


export class Resolver implements IResolver{
    private res!: Response
    constructor() {}
    setResponse(res:Response):void{
        this.res = res
    }
    private sendResponse(statusCode: number, data: any, message: string): void {
        if (!this.res) {
            throw new Error("Response object not set.");
        }
        this.res.status(statusCode).send({ data, message, code: statusCode });
    }

    success(data: any, message: string): void {
        this.sendResponse(200, data, message);
    }

    conflict(data: any, message: string): void {
        this.sendResponse(409, data, message);
    }

    badRequest(data: any, message: string): void {
        this.sendResponse(400, data, message);
    }

    // Additional methods for other status codes can be added here
    internalServerError(data: any, message: string): void {
        this.sendResponse(500, data, message);
    }

    notFound(data: any, message: string): void {
        this.sendResponse(404, data, message);
    }
    forbidden(data : any, message: string): void{
        this.sendResponse(403,data,message)
    }
    unauthorized(data: any, message: string): void{
        this.sendResponse(401, data, message)
    }
}
