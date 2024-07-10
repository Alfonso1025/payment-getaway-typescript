import { IImageService } from "./IImageService";
import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectsCommand} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import * as fs from 'fs';
import { ImgServiceConnectionErr } from "./errors";
import dotenv from 'dotenv';

dotenv.config();


export class S3 implements IImageService{

    private region: string;
    private bucketName: string;
    private accessKeyId: string;
    private secretAccessKey: string;
    private s3: S3Client;
    

    constructor() {
        this.region = process.env.S3_REGION || '';
        this.bucketName = process.env.BUCKET_NAME || '';
        this.accessKeyId = process.env.AWS_ACCESS_KEY_ID || '';
        this.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || '';
        this.s3 = this.createS3Instance()
        

        if (!this.region || !this.bucketName || !this.accessKeyId || !this.secretAccessKey) {
            throw new Error("Missing S3 configuration values");
        }
    }
    
    createS3Instance() : S3Client{

        const s3 = new S3Client({
                region: this.region,
                credentials: {
                    accessKeyId: this.accessKeyId,
                    secretAccessKey: this.secretAccessKey
                }
            });
            return s3
    }
    async uploadImage(filePath: string, key : string): Promise<string> {

        
        const fileStream = fs.createReadStream(filePath)
        const uploadParams = {
            Bucket: this.bucketName,
            Body: fileStream,
            Key: key
        }
        const command = new PutObjectCommand(uploadParams)
        try {
            const result = await this.s3.send(command);
            if (result.$metadata.httpStatusCode === 200 && result.ETag){
                return 'image_uploaded_succesfuly'
            }
            return 'failed_uploading_image'
        } catch (error) {
            
            console.log(error)
        }
       

        
        return 'pass'
    }
    async retrieveImage(key: string): Promise<string> {
        
        const downloadParams = {
            Bucket: this.bucketName,
            Key: key
        };

        const command = new GetObjectCommand(downloadParams);

        try {
            const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 });
            console.log('Generated pre-signed URL:', url);
            return url;
        } catch (error) {
            if(error instanceof Error){
                throw new ImgServiceConnectionErr(error.message, 's3')
            }
            else{
                console.log(error)
            }
            return ''
            //throw new Error('Error retrieving file');
        }
    }
    async deleteImages(keys: string[]): Promise<string> {
        const deleteParams = {
            Bucket: this.bucketName,
            Delete: {
                Objects: keys.map(key => ({ Key: key }))
            }
        };
        const command = new DeleteObjectsCommand(deleteParams);
        try {
            const result = await this.s3.send(command);
            console.log(result)
            if (result.$metadata.httpStatusCode === 200) {
                return 'images_deleted_successfully';
            }
            return 'failed_deleting_images';
        } catch (error) {
            if (error instanceof Error) {
                throw new ImgServiceConnectionErr(error.message, 's3');
            } else {
                console.log(error);
            }
            return 'failed_deleting_images';
        }
    }

    

}