import { Module } from '@nestjs/common';
import { MediaObjectService } from './media-object.service';
import { MediaObjectController } from './media-object.controller';
import { StorageService } from '@libs/common/storage';

@Module({
  providers: [MediaObjectService, StorageService],
  controllers: [MediaObjectController],
})
export class MediaObjectModule {}
