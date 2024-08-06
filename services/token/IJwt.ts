export interface IJwtService{
    createToken(userId : number):string|null
    isTokenValid(token:string|undefined):boolean
}