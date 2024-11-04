import { Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExportExcelService } from './export-excel.service';
import { Response } from 'express';

@Controller('export-excel')
@ApiTags('export-excel')
export class ExportExcelController {
  constructor(private exportExcelService: ExportExcelService) {}

  @Post('user')
  async getExportUserExcel(@Res() res: Response) {
    return await this.exportExcelService.getExportUserExcel(res);
  }
}
