import { Module } from '@nestjs/common';
import { DatabaseModule } from '@config/database.module';
import { ConfigModule } from '@config/config.module';
import { ApiModule } from '@application/api.module';
import { AuthModule } from '@authen/authen.module';

@Module({
  imports: [AuthModule, ConfigModule, DatabaseModule, ApiModule],
})
export class AppModule {}
