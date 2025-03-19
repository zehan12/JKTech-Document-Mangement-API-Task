require('module-alias/register')
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResponseInterceptor } from '@core/interceptors';
import { GlobalExceptionFilter } from '@core/filters';
import { validationPipeOptions } from '@core/pipes';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const logger = new Logger();
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

  const config = new DocumentBuilder()
    .setTitle('Document Management API')
    .setDescription(' NestJS API to manage user authentication, document management, and ingestion controls')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`==========================================================`);
  logger.log(`App Environment is ${env}`, 'NestApplication');

  logger.log(`==========================================================`);

  logger.log(`Server running on ${await app.getUrl()}`, 'NestApplication');

  logger.log(`==========================================================`);

}
void bootstrap();
