import { imageKey } from "./types";

export interface IImageService{
    uploadImage(filePath: string, imageName : string): Promise<string>
    retrieveImage(sku : string) : Promise<string>
    deleteImages(keys : string[]):Promise<string>
   
}