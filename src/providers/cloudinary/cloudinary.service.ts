import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class CloudinaryService {
    static uploadFile: any;
    constructor( configServer: ConfigService ) {
        cloudinary.config({
            cloud_name: configServer.get<string>("cloudinary.name"),
            api_key: configServer.get<string>("cloudinary.apiKey"),
            api_secret:configServer.get<string>("cloudinary.apiSecret")
        });
    }

    async uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
        if (!file || !file.buffer) {
            throw new BadRequestException('File buffer is missing');
        }

        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { resource_type: 'raw' },
                (error: UploadApiErrorResponse, result: UploadApiResponse) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );

            // Convert file buffer to a readable stream
            const readableStream = new Readable();
            readableStream.push(file.buffer);
            readableStream.push(null);
            readableStream.pipe(uploadStream);
        });
    }
}
