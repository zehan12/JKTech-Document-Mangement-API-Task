require('module-alias/register')
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResponseInterceptor } from '@core/interceptors';
import { GlobalExceptionFilter } from '@core/filters';
import { validationPipeOptions } from '@core/pipes';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configServer = app.get(ConfigService);
  const env = configServer.get<number>('app.env')
  const secret = configServer.get<string>('auth.jwt.secret')
  console.log(secret, env)

  app.setGlobalPrefix('api', {
    exclude: ['healthcheck'],
  });

  app.enableVersioning({
    type: VersioningType.URI
  });

  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
