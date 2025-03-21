import { Injectable, NotFoundException } from '@nestjs/common';
import { IngestionStatus } from '@prisma/client';
import { PrismaService } from '../../providers/prisma';

@Injectable()
export class IngestionService {
    constructor(private prisma: PrismaService) { }

    async triggerIngestion(documentId: number) {
        const ingestion = await this.prisma.ingestion.create({
            data: {
                documentId,
                status: IngestionStatus.PROCESSING,
            },
        });

        return ingestion;
    }

    async getStatus(ingestionId: string) {
        const ingestion = await this.prisma.ingestion.findUnique({
            where: { id: ingestionId },
        });

        if (!ingestion) throw new NotFoundException('Ingestion not found');
        return ingestion;
    }

    async updateIngestionStatus(id: string, status: IngestionStatus, error: string | null = null) {
        return this.prisma.ingestion.update({
            where: { id },
            data: {
                status,
                error,
                retries: status === IngestionStatus.FAILED ? { increment: 1 } : undefined,
            },
        });
    }
}
