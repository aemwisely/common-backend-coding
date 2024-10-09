import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { extname } from 'path';

@Injectable()
export class StorageService {
  private minioClient: Minio.Client;

  constructor(private configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: this.configService.get('minio.url'),
      port: parseInt(this.configService.get('minio.port'), 10),
      useSSL: this.configService.get('minio.ssl') === 'true',
      accessKey: this.configService.get('minio.accessKey'),
      secretKey: this.configService.get('minio.secretKey'),
    });
  }

  async upload(bucket: string, file: Express.Multer.File) {
    try {
      return this.putObjectAndPresignUrl(bucket, file);
    } catch (error) {
      throw error;
    }
  }

  private getRandomFileName(file: Express.Multer.File) {
    //random name
    const randomName =
      new Date().getTime() +
      '-' +
      Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    return `${randomName}-${new Date().getTime()}${extname(file.originalname)}`;
  }

  private async putObjectAndPresignUrl(
    bucket: string,
    file: Express.Multer.File,
  ): Promise<{
    filename: string;
    url: string;
    key: string;
  }> {
    // key = filename ? folder = folder + /$filename
    const filename = this.getRandomFileName(file);
    const key = filename;
    await this.minioClient.putObject(bucket, key, file.buffer);
    const url = await this.presignedUrl(bucket, key);

    return {
      filename,
      url,
      key,
    };
  }

  async presignedUrl(
    bucket: string,
    key: string,
    expiry: number = 60 * 60 * 24 * 7,
  ): Promise<string> {
    return this.minioClient.presignedGetObject(bucket, key, expiry);
  }
}
