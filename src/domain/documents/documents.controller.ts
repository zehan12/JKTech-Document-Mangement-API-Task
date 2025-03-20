import { JwtAuthGuard } from '../../core/guards';
import { Controller, HttpStatus, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller({ path: "documents", version: "1" })
@UseGuards(JwtAuthGuard)
export class DocumentsController {
    constructor(private readonly documentService: DocumentsService) { }

    @Post('upload')
    @ApiOperation({ summary: 'Upload a document' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Upload a document',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'Document uploaded successfully',
    })
    @ApiResponse({
        status: HttpStatus.NOT_FOUND,
        description: 'File not found',
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Unauthorized - JWT token is missing or invalid',
    })
    @ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal Server Error - Failed to upload document',
    })
    @UseInterceptors(FileInterceptor('file'))
    async uploadDocument(
        @UploadedFile() file: Express.Multer.File,
        @Request() req
    ) {

        return await this.documentService.uploadDocument(file, req.user.id)

    }
}
