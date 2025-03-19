import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import Configs from "./config";

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