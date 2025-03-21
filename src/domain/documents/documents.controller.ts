import { JwtAuthGuard, RolesGuard } from '../../core/guards';
import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Roles } from '@core/decorators';
import { ROLE } from '@core/enums';

@Controller({ path: "documents", version: "1" })
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) { }

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
    @ApiCreatedResponse({ description: 'Document uploaded successfully' })
    @ApiNotFoundResponse({ description: 'Document not found', })
    @ApiUnauthorizedResponse({ description: 'Unauthorized', })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error', })
    @UseInterceptors(FileInterceptor('file'))
    async uploadDocument(
        @UploadedFile() file: Express.Multer.File,
        @Request() req
    ) {
        return await this.documentsService.uploadDocument(file, req.user.id)
    }


    @Get("")
    @ApiOperation({ summary: 'Fetch all documents' })
    @ApiOkResponse({ description: 'Fetch all documents' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error ' })
    async getAllDocuments() {
        return this.documentsService.getAllDocuments();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Fetch single document by ID' })
    @ApiOkResponse({ description: 'Fetch document' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiNotFoundResponse({ description: 'Document not found', })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error ' })
    async getDocument(@Param('id') id: string) {
        return this.documentsService.getDocument(Number(id));
    }

    @Patch(':id')
    @Roles(ROLE.ADMIN, ROLE.EDITOR)
    @ApiOperation({ summary: 'Update document by ( Admin or Editor only )' })
    @ApiOkResponse({ description: 'Document updated successfully' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiNotFoundResponse({ description: 'Document not found', })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error ' })
    async updateDocument(@Param('id') id: string, @Body() body: { title: string }) {
        return await this.documentsService.updateDocument(Number(id), body);
    }

    @Delete(":id")
    @Roles(ROLE.ADMIN, ROLE.EDITOR)
    @ApiOperation({ summary: 'Delete document by ( Admin only )' })
    @ApiOkResponse({ description: 'Delete updated successfully' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @ApiNotFoundResponse({ description: 'Document not found', })
    @ApiInternalServerErrorResponse({ description: 'Internal Server Error ' })
    async deleteDocument(@Param('id') id: string) {
        return await this.documentsService.deleteDocument(Number(id));
    }

}
