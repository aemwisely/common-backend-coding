import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { MediaObjectModule } from './media-object/media-object.module';
import { ExportExcelModule } from './export-excel/export-excel.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [UserModule, MediaObjectModule, ExportExcelModule, RoleModule],
})
export class ApiModule {}
