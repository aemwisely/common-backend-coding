import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';
import dayjs from '@libs/common/shared/dayjs';

@Injectable()
export class ExportExcelService {
  constructor(
    @InjectDataSource()
    private datasource: DataSource,
  ) {}

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
    for (const object of data) {
      worksheet.addRow(object);
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

    this.insertRowIntoWorksheet(worksheet, [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    ]);

    this.setResponseHeaders(res, 'users');

    await workbook.xlsx.write(res);
    res.end();
  }
}
