import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MediaObjectModule } from './media-object/media-object.module';
import { ExportExcelModule } from './export-excel/export-excel.module';

@Module({
  imports: [UserModule, MediaObjectModule, ExportExcelModule],
})
export class ApiModule {}
