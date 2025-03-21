require('module-alias/register')
import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../../core/guards';
import { FileInterceptor } from '@nestjs/platform-express';

describe('DocumentsController', () => {
  let controller: DocumentsController;
  let documentsService: DocumentsService;

  const mockFile = {
    originalname: 'test.pdf',
    buffer: Buffer.from('test file content'),
  } as Express.Multer.File;

  const mockUserId = '12345';
  const mockUploadResult = {
    message: 'Document uploaded successfully',
    statusCode: 201,
    data: {
      document: {
        id: '67890',
        title: mockFile.originalname,
        url: 'https://res.cloudinary.com/example/test.pdf',
        userId: mockUserId,
      },
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentsController],
      providers: [
        {
          provide: DocumentsService,
          useValue: {
            uploadDocument: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true }) // Mock JwtAuthGuard
      .overrideInterceptor(FileInterceptor('file'))
      .useValue({}) // Mock FileInterceptor
      .compile();

    controller = module.get<DocumentsController>(DocumentsController);
    documentsService = module.get<DocumentsService>(DocumentsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('uploadDocument', () => {
    it('should upload a document successfully', async () => {
      // Mock service method
      (documentsService.uploadDocument as jest.Mock).mockResolvedValue(mockUploadResult);

      const req = { user: { id: mockUserId } };
      const result = await controller.uploadDocument(mockFile, req);

      expect(documentsService.uploadDocument).toHaveBeenCalledWith(mockFile, mockUserId);
      expect(result).toEqual(mockUploadResult);
    });
  });
});