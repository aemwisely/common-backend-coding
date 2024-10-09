import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Minio from 'minio';
import { extname } from 'path';

@Injectable()
export class StorageService {
  private minioClient: Minio.Client;

  constructor(private configService: ConfigService) {
    this.minioClient = new Minio.Client({
      endPoint: process.env.MINIO_URL,
      port: parseInt(process.env.MINIO_PORT),
      useSSL: process.env.MINIO_SSL === 'true',
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    });
  }

  getRandomFileName(file: Express.Multer.File) {
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

  async upload(subPath: string, file: Express.Multer.File): Promise<[string, string]> {
    try {
      const filename = this.getRandomFileName(file);
      const bucket = this.configService.get('MINIO_BUCKET');
      const objectName = `${subPath}/${filename}`;
      await this.minioClient.putObject(bucket, objectName, file.buffer);
      const url = await this.presignedUrl(objectName);
      return [filename, url];
    } catch (error) {
      throw error;
    }
  }

  async presignedUrl(filename: string) {
    const bucket = this.configService.get('MINIO_BUCKET');
    return await this.minioClient.presignedGetObject(bucket, filename, 60 * 60 * 24 * 7);
  }
}
