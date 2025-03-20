import { Module } from '@nestjs/common';
import { PrismaModule } from '@providers/prisma';
import { AuthModule } from '@domain/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '@domain/user/user.module';
import { HealthModule } from '@domain/health/health.module';
import { CloudinaryService } from '@providers/cloudinary/cloudinary.service';
import { DocumentsModule } from '@domain/documents/documents.module';
import Configs from "@core/config";
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from "path";

const envFilePathDevelopment = ".env";
const envFilePathProduction = "/etc/secrets/.env"
@Module({
  imports: [
    ConfigModule.forRoot({
      load: Configs,
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true,
      expandVariables: true,
      envFilePath: [process.env.NODE_ENV === "production" ? envFilePathProduction : envFilePathDevelopment]
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
      limits: { fieldSize: 10 * 1024 * 1024 }, // Ensures form fields are included
    }),
    PrismaModule, AuthModule,
    UserModule,
    HealthModule,
    DocumentsModule,
  ],
  controllers: [],
  providers: [ConfigService, CloudinaryService],
  exports: []
})
export class AppModule { }