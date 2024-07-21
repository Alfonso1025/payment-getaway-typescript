import { Response } from "express";

export interface IResolver {
    setResponse(res: Response): void
    success(data: any, message: string): void;
    conflict(data: any, message: string): void;
    badRequest(data: any, message: string): void;
    internalServerError(data: any, message: string): void;
    notFound(data: any, message: string): void;
    forbidden(data: any, message: string): void;
    unauthorized(data: any, message: string): void;
}
