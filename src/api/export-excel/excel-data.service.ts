import { UserEntity } from '@libs/core/entities';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class ExcelDataService {
  constructor(@InjectDataSource() private datasource: DataSource) {}

  async getUser() {
    const queryBuilder = await this.datasource
      .createQueryBuilder(UserEntity, 'u')
      .getMany();

    return queryBuilder;
  }
}
