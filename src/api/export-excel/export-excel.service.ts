import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';

@Injectable()
export class ExportExcelService {
  constructor(
    @InjectDataSource()
    private datasource: DataSource,
  ) {}

  async getExportUserExcel(res: Response): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sample Sheet');

    // Adding Columns
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 32 },
      { header: 'Email', key: 'email', width: 32 },
    ];

    // Adding Rows
    worksheet.addRow({ id: 1, name: 'John Doe', email: 'john.doe@example.com' });
    worksheet.addRow({ id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' });

    // Set HTTP headers and send the response
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=sample.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  }
}
