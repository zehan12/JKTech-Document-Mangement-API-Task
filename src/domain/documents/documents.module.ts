import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsController } from './documents.controller';
import { PrismaService } from '@providers/prisma';
import { CloudinaryService } from '@providers/cloudinary/cloudinary.service';

@Module({
  imports: [],
  providers: [DocumentsService, PrismaService, CloudinaryService],
  controllers: [DocumentsController],
  exports: [CloudinaryService]
})
export class DocumentsModule { }
