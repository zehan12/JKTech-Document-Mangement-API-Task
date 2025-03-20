import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma';
import { CloudinaryService } from '../../providers/cloudinary/cloudinary.service';

@Injectable()
export class DocumentsService {
    constructor(
        private prismaService: PrismaService,
        private cloudinaryService: CloudinaryService
    ) { }

    async uploadDocument(
        file: Express.Multer.File,
        userId: string
    ) {
        try {

            if (!file) {
                throw new NotFoundException({
                    message: 'File not found',
                    statusCode: HttpStatus.NOT_FOUND,
                    error: { code: HttpStatus.NOT_FOUND, details: 'upload file not detected' }
                });
            }

            const uploadResult = await this.cloudinaryService.uploadFile(file);
            const document = await this.prismaService.document.create({
                data: {
                    title: file.originalname,
                    url: uploadResult.secure_url,
                    userId: userId,
                },
            });

            return {
                message: "File upload successfully",
                statusCode: HttpStatus.CREATED,
                data: {
                    document,
                }
            };

        } catch (err) {

            if (err instanceof HttpException) {
                throw err;
            }

            throw new InternalServerErrorException({
                message: 'Something went wrong',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                error: { code: HttpStatus.INTERNAL_SERVER_ERROR, details: err.message || 'Unexpected error occurred' }
            });
        }
    }


}
