import { error } from "console";

export class ImgServiceConnectionErr extends Error {
   
    constructor(message: string, serviceName: string) {
        
        const concatMessage = `service: ${serviceName}, message:  ${message} `;

        super(concatMessage);
        
        
        
    }
}