import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { MediaObjectService } from './media-object.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommonFilter, FileUpload } from 'libs/common';

@Controller('media-object')
@ApiTags('media-object')
export class MediaObjectController {
  constructor(private mediaObjService: MediaObjectService) {}

  @Post('/')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', { limits: { fileSize: 10 * 1024 * 1024 } }))
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

  @Get('/')
  async findAll(@Query() filter: CommonFilter) {
    const { page, getPageCount, limit } = filter;
    const [result, total] = await this.mediaObjService.findAllAndCount(filter);
    return {
      data: result,
      total,
      page,
      limit,
      pageCount: getPageCount(limit, total),
    };
  }

  @Get('/:id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {
    const result = await this.mediaObjService.findOneById(id);
    return {
      data: result,
    };
  }
}
