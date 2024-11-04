import { Module } from '@nestjs/common';
import { ExportExcelService } from './export-excel.service';
import { ExportExcelController } from './export-excel.controller';

@Module({
  providers: [ExportExcelService],
  controllers: [ExportExcelController],
})
export class ExportExcelModule {}
