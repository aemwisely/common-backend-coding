import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MediaObjectModule } from './media-object/media-object.module';

@Module({
  imports: [UserModule, MediaObjectModule],
})
export class ApiModule {}
