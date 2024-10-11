import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import {
  AllExceptionsFilter,
  TransformInterceptor,
  corsOptions,
} from '@libs/common/shared';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SwaggerSetup from '@libs/common/shared/swagger-setup';
import helmet from 'helmet';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);
  const prefix = configService.get('SERVICE_PREFIX', 'api');
  const port = configService.get('SERVICE_PORT', 3000);

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.setGlobalPrefix(prefix);
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
    }),
  );

  SwaggerSetup(app, prefix, 'base');

  app.enableCors(corsOptions);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(port, async () => {
    const url = await app.getUrl();
    logger.warn(`Application is running on ${url}/${prefix}`);
    logger.warn(`Documentation is running on ${url}/${prefix}/docs`);
  });
}

(async () => await bootstrap())();
