import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';
import dayjs from '@libs/common/shared/dayjs';
import { ExcelDataService } from './excel-data.service';

@Injectable()
export class ExportExcelService {
  constructor(private dataService: ExcelDataService) {}

  private addHeaders(
    worksheet: ExcelJS.Worksheet,
    headers: { header: string; key: string; width: number }[],
  ): ExcelJS.Worksheet {
    worksheet.columns = headers;

    return worksheet;
  }

  private insertRowIntoWorksheet(
    worksheet: ExcelJS.Worksheet,
    data: object[],
  ): ExcelJS.Worksheet {
    if (data?.length > 0) {
      for (const object of data) {
        worksheet.addRow(object);
      }
    }

    return worksheet;
  }

  private setResponseHeaders(res: Response, filename: string): void {
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${filename}-%${dayjs().format('YYYY-MM-DDTHH:mm')}.xlsx`,
    );

    return;
  }

  async getExportUserExcel(res: Response): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sample Sheet');

    this.addHeaders(worksheet, [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 32 },
      { header: 'Email', key: 'email', width: 32 },
    ]);

    const getUserByFilter = await this.dataService.getUser();

    const formattedUserData = getUserByFilter?.map((value, index) => ({
      id: index + 1,
      name:
        value?.firstName && value?.lastName
          ? `${value.firstName} ${value.lastName}`
          : '-',
      email: value?.email || '-',
    }));

    this.insertRowIntoWorksheet(worksheet, formattedUserData);

    this.setResponseHeaders(res, 'users');

    await workbook.xlsx.write(res);
    res.end();
  }
}
