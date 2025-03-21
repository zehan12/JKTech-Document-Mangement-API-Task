import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../providers/prisma';
import { CloudinaryService } from '../../providers/cloudinary/cloudinary.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
                    message: 'Document not found',
                    statusCode: HttpStatus.NOT_FOUND,
                    error: { code: HttpStatus.NOT_FOUND, details: 'upload document not detected' }
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
                message: "Document upload successfully",
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


    async getAllDocuments() {
        try {
            const documents = await this.prismaService.document.findMany({});

            return {
                message: "Fetch All Documents",
                statusCode: HttpStatus.OK,
                data: {
                    documents,
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

    async getDocument(docId: number) {
        try {
            const document = await this.prismaService.document.findFirst({ where: { id: docId } });

            if (!document) {
                throw new NotFoundException({
                    message: 'Document not found',
                    statusCode: HttpStatus.NOT_FOUND,
                    error: { code: HttpStatus.NOT_FOUND, details: 'upload document not detected' }
                });
            }

            return {
                message: "Fetch document",
                statusCode: HttpStatus.OK,
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

    async updateDocument(docId: number, body: { title: string }) {
        try {
            const document = await this.prismaService.document.update({
                where: { id: docId },
                data: {
                    title: body.title
                }
            });

            if (!document) {
                throw new NotFoundException({
                    message: 'Document not found',
                    statusCode: HttpStatus.NOT_FOUND,
                    error: { code: HttpStatus.NOT_FOUND, details: 'upload document not detected' }
                });
            }

            return {
                message: "Update document successfully",
                statusCode: HttpStatus.OK,
                data: {
                    document,
                }
            };

        } catch (err) {

            if (err instanceof HttpException) {
                throw err;
            }


            if (err instanceof PrismaClientKnownRequestError && err.code === 'P2025') {
                throw new NotFoundException({
                    message: 'Document not found',
                    statusCode: HttpStatus.NOT_FOUND,
                    error: { code: HttpStatus.NOT_FOUND, details: 'Invalid document id or document does not exist' }
                });
            }

            throw new InternalServerErrorException({
                message: 'Something went wrong',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                error: { code: HttpStatus.INTERNAL_SERVER_ERROR, details: err.message || 'Unexpected error occurred' }
            });
        }
    }

    async deleteDocument(docId: number) {

        try {

            if (isNaN(docId)) {
                throw new NotFoundException({
                    message: 'Document not found',
                    statusCode: HttpStatus.NOT_FOUND,
                    error: {
                        code: HttpStatus.NOT_FOUND,
                        details: 'Invalid document ID or document does not exist',
                    },
                });
            }

            const document = await this.prismaService.document.delete({
                where: { id: docId },
            });

            return {
                message: 'Document deleted successfully',
                statusCode: HttpStatus.OK,
                data: {
                    document,
                },
            };
        } catch (err) {
            console.log(err)
            if (err instanceof HttpException) {
                throw err;
            }
            if (
                err instanceof PrismaClientKnownRequestError &&
                err.code === 'P2025' || err.code === 'P1001'
            ) {
                throw new NotFoundException({
                    message: 'Document not found',
                    statusCode: HttpStatus.NOT_FOUND,
                    error: {
                        code: HttpStatus.NOT_FOUND,
                        details: 'Invalid document ID or document does not exist',
                    },
                });
            }

            throw new InternalServerErrorException({
                message: 'Something went wrong',
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                error: {
                    code: HttpStatus.INTERNAL_SERVER_ERROR,
                    details: err.message || 'Unexpected error occurred',
                },
            });
        }
    }

}
