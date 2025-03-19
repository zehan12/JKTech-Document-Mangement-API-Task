import { Module } from '@nestjs/common';
import { PrismaModule } from './core/prisma';
import { AuthModule } from './domain/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './domain/user/user.module';
import Configs from "./core/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: Configs,
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true,
      expandVariables: true,
      // envFilePath: ['.env']
    }), PrismaModule, AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [ConfigService],
  exports: []
})
export class AppModule { }