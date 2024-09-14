import AppConfig from '@libs/common/config/app.config';
import DatabaseConfig from '@libs/common/config/database.config';
import MinioConfig from '@libs/common/config/minio.config';
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [
        () => ({
          app: AppConfig(),
          database: DatabaseConfig(),
          minio: MinioConfig(),
        }),
      ],
    }),
  ],
})
export class ConfigModule {}
