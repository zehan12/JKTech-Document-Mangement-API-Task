import { Test, TestingModule } from '@nestjs/testing';
import { IngestionService } from './ingestion.service';
import { PrismaService } from '../../providers/prisma';
import { IngestionStatus } from '../../core/enums';

describe('IngestionService', () => {
  let service: IngestionService;
  let prisma: PrismaService;

  const mockIngestion = {
    id: 'mock-id',
    documentId: 1,
    status: IngestionStatus.PROCESSING,
    error: null,
    retries: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const prismaMock = {
    ingestion: {
      create: jest.fn().mockResolvedValue(mockIngestion),
      findUnique: jest.fn().mockResolvedValue(mockIngestion),
      update: jest.fn().mockResolvedValue({
        ...mockIngestion,
        status: IngestionStatus.COMPLETED,
      }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngestionService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<IngestionService>(IngestionService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should trigger ingestion and return the ingestion record', async () => {
    const result = await service.triggerIngestion(1);
    expect(result).toEqual(mockIngestion);
    expect(prisma.ingestion.create).toHaveBeenCalledWith({
      data: {
        documentId: 1,
        status: IngestionStatus.PROCESSING,
      },
    });
  });

  it('should get ingestion status by ID', async () => {
    const result = await service.getStatus('mock-id');
    expect(result).toEqual(mockIngestion);
    expect(prisma.ingestion.findUnique).toHaveBeenCalledWith({
      where: { id: 'mock-id' },
    });
  });

  it('should update ingestion status', async () => {
    const result = await service.updateIngestionStatus('mock-id', IngestionStatus.COMPLETED);
    expect(result.status).toBe(IngestionStatus.COMPLETED);
    expect(prisma.ingestion.update).toHaveBeenCalledWith({
      where: { id: 'mock-id' },
      data: {
        status: IngestionStatus.COMPLETED,
        error: null,
      },
    });
  });

  it('should increment retries if status is FAILED', async () => {
    await service.updateIngestionStatus('mock-id', IngestionStatus.FAILED, 'Error!');
    expect(prisma.ingestion.update).toHaveBeenCalledWith({
      where: { id: 'mock-id' },
      data: {
        status: IngestionStatus.FAILED,
        error: 'Error!',
        retries: { increment: 1 },
      },
    });
  });
});
