import { Injectable } from '@nestjs/common';
import { IngestionService } from '../domain/ingestion/ingestion.service';

@Injectable()
export class MockPythonService {
    constructor(private ingestionService: IngestionService) { }

    simulateIngestion(docId: number, ingestionId: string) {
        // Simulate async process
        setTimeout(async () => {
            const success = Math.random() > 0.2; // 80% success rate
            await this.ingestionService.updateIngestionStatus(
                ingestionId,
                success ? 'COMPLETED' : 'FAILED',
                success ? null : 'Mock error during ingestion',
            );
        }, 3000);
    }
}
