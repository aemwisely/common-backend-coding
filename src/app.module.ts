import { Module } from '@nestjs/common';
import { DatabaseModule } from '@config/database.module';
import { ConfigModule } from '@config/config.module';
import { ApiModule } from '@application/api.module';

@Module({
  imports: [ConfigModule, DatabaseModule, ApiModule],
})
export class AppModule {}
