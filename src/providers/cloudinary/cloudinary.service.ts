import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';
import * as multer from 'multer';



@Injectable()
export class CloudinaryService {
    constructor(config: ConfigService) {
        cloudinary.config({
            cloud_name: config.get<string>("cloudinary.name"),
            api_key: config.get<string>("cloudinary.apikey"),
            api_secret: config.get<string>("cloudinary.apiSecret")
        })
    }

    async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: 'raw' },
                (error: UploadApiErrorResponse, result: UploadApiResponse) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );

            const readableStream = new Readable();
            readableStream.push(file.buffer);
            readableStream.push(null);
            readableStream.pipe(uploadStream);
        });
    }

}
