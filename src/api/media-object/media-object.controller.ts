import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { MediaObjectService } from './media-object.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUpload } from 'libs/common';

@Controller('media-object')
@ApiTags('media-object')
export class MediaObjectController {
  constructor(private mediaObjService: MediaObjectService) {}

  @Post('/')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 30 * 1024 * 1024 } }))
  async created(@UploadedFile() file: Express.Multer.File, @Body() body: FileUpload) {
    try {
      const result = await this.mediaObjService.createAndUploadMediaFile(file, body);
      return {
        data: result,
      };
    } catch (error) {
      throw error;
    }
  }
}
