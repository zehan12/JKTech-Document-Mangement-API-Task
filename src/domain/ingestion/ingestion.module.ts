import { Module } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { IngestionController } from './ingestion.controller';
import { PrismaModule } from '@providers/prisma';
import { MockPythonService } from 'src/external/mock-python.service';

@Module({
  imports: [PrismaModule],
  controllers: [IngestionController],
  providers: [IngestionService, MockPythonService],
})
export class IngestionModule { }
