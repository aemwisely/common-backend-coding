import { UserEntity } from '@libs/core/entities';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, FindOneOptions } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectDataSource()
    private datasource: DataSource,
  ) {}

  async findOne(options: FindOneOptions<UserEntity>): Promise<UserEntity> {
    return await this.datasource.manager.findOne(UserEntity, options);
  }
}
