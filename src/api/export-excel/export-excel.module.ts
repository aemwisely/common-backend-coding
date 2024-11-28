import { Module } from '@nestjs/common';
import { ExportExcelController } from './export-excel.controller';
import { ExcelDataService } from './service/excel-data.service';
import { ExportExcelService } from './service/export-excel.service';

@Module({
  providers: [ExportExcelService, ExcelDataService],
  controllers: [ExportExcelController],
})
export class ExportExcelModule {}
