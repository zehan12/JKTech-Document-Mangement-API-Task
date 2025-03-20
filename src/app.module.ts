import { Module } from '@nestjs/common';
import { PrismaModule } from './providers/prisma';
import { AuthModule } from './domain/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './domain/user/user.module';
import { HealthModule } from './domain/health/health.module';
import { CloudinaryService } from './providers/cloudinary/cloudinary.service';
import Configs from "./core/config";

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
    }), PrismaModule, AuthModule,
    UserModule,
    HealthModule
  ],
  controllers: [],
  providers: [ConfigService, CloudinaryService],
  exports: []
})
export class AppModule { }