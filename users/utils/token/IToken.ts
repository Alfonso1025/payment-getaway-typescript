export interface IJwtGenerator{
    createToken(userId : number):string|null
    verifyToken(token:string):boolean
}