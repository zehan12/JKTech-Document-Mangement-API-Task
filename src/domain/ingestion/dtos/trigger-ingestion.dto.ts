import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class TriggerIngestionDto {
    @ApiProperty({
        example: 1,
        description: 'ID of the document to be ingested',
    })
    @IsNumber()
    documentId: number;
}