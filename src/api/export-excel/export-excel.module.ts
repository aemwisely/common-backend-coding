import { Module } from '@nestjs/common';
import { ExportExcelService } from './export-excel.service';
import { ExportExcelController } from './export-excel.controller';
import { ExcelDataService } from './excel-data.service';

@Module({
  providers: [ExportExcelService, ExcelDataService],
  controllers: [ExportExcelController],
})
export class ExportExcelModule {}
