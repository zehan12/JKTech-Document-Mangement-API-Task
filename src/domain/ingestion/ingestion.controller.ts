import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { MockPythonService } from '../../external/mock-python.service';
import { ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOperation, ApiParam, ApiProperty } from '@nestjs/swagger';
import { TriggerIngestionDto } from './dtos';

@Controller({ path: "ingestion", version: "1" })
export class IngestionController {
    constructor(
        private ingestionService: IngestionService,
        private mockPythonService: MockPythonService,
    ) { }

    @Post('trigger')
    @ApiOperation({ summary: 'Trigger ingestion for a document' })
    @ApiCreatedResponse({ description: 'Ingestion started successfully' })
    @ApiInternalServerErrorResponse({ description: 'Server error during ingestion trigger' })

    @HttpCode(HttpStatus.CREATED)
    async trigger(@Body() body: TriggerIngestionDto) {
        const ingestion = await this.ingestionService.triggerIngestion(body.documentId);

        this.mockPythonService.simulateIngestion(body.documentId, ingestion.id);

        return {
            status: 'success',
            message: 'Ingestion started',
            ingestionId: ingestion.id,
        };
    }

    @Get('status/:id')
    @ApiOperation({ summary: 'Get ingestion status by ID' })
    @ApiCreatedResponse({ description: 'Returns ingestion' })
    @ApiNotFoundResponse({ description: 'Ingestion not found' })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Ingestion ID',
        example: 'c7d161f1-aae2-41b8-9dfd-9d9504af58e8',
    })
    async getStatus(@Param('id') id: string) {
        const ingestion = await this.ingestionService.getStatus(id);

        return {
            status: 'success',
            data: {
                ingestion,
            },
        };
    }
}
