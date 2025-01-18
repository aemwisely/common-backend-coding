import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ExportExcelService } from './service/export-excel.service';
import { Response } from 'express';
import { JwtAuthGuard } from '@libs/common/auth';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('export-excel')
@Controller('export-excel')
export class ExportExcelController {
  constructor(private exportExcelService: ExportExcelService) {}

  @Post('/user')
  async getExportUserExcel(@Res() res: Response) {
    return await this.exportExcelService.getExportUserExcel(res);
  }
}
