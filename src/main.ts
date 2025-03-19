import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configServer = app.get(ConfigService);
  const env = configServer.get<number>('app.env')
  const secret = configServer.get<string>('auth.jwt.secret')
  console.log(secret, env)

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI
  });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
