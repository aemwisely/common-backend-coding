import { CommonFilter } from '@libs/common/base';
import { FileUpload } from '@libs/common/shared';
import dayjs from '@libs/common/shared/dayjs';
import { StorageService } from '@libs/common/storage';
import { MediaObjectEntity } from '@libs/core/entities';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Equal, Repository } from 'typeorm';

@Injectable()
export class MediaObjectService {
  private repository: Repository<MediaObjectEntity>;
  constructor(
    @InjectDataSource() private datasource: DataSource,
    private storageService: StorageService,
    private configService: ConfigService,
  ) {
    this.repository = this.datasource.getRepository(MediaObjectEntity);
  }

  async createAndUploadMediaFile(file: Express.Multer.File, body: FileUpload) {
    try {
      const { mimetype, size, originalname } = file;
      const { alternativeText, width, height } = body;

      const bucket = this.configService.get('minio.bucket');
      const { filename, url, key } = await this.storageService.upload(bucket, file);

      const originalFilename = originalname
        ? Buffer.from(originalname, 'latin1').toString('utf8')
        : Buffer.from(filename, 'latin1').toString('utf8');

      const mediaObject = this.repository.create({
        filename: filename,
        originalFilename: originalFilename,
        dueDate: new Date(dayjs().add(7, 'day').toISOString()),
        mimeType: mimetype,
        size,
        alternativeText: alternativeText,
        width,
        height,
        url,
        key,
      });
      return await this.repository.save(mediaObject);
    } catch (error) {
      throw error;
    }
  }

  async findAllAndCount(filter: CommonFilter) {
    const { pagination, getOffset, limit } = filter;
    const queryBuilder = this.repository.createQueryBuilder('m');

    if (pagination) {
      queryBuilder.skip(getOffset(filter)).take(limit);
    }

    queryBuilder.orderBy('m.createdAt', 'DESC');
    return await queryBuilder.getManyAndCount();
  }

  async findOneById(id: number) {
    return await this.repository.findOne({ where: { id: Equal(id) } });
  }
}
