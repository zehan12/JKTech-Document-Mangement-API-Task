import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateDocumentDto {
    @ApiProperty({
        example: 1,
        description: 'Title of the document',
    })
    title: string;
}