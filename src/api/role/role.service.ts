import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, FindOneOptions, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create.role.dto';
import { RoleEntity } from '@libs/core/entities';
import { CommonFilter } from 'libs/common';

@Injectable()
export class RoleService {
  private repository: Repository<RoleEntity>;
  constructor(@InjectDataSource() private datasource: DataSource) {
    this.repository = this.datasource.getRepository(RoleEntity);
  }

  async createRole(body: CreateRoleDto) {
    try {
      const { title, isActive } = body;

      const createRole = this.repository.create({ title, isActive });

      return await this.repository.save(createRole);
    } catch (error) {
      throw error;
    }
  }

  async findAllAndCountedRole(filter: CommonFilter) {
    try {
      const { pagination, getOffset, limit } = filter;

      const queryBuilder = this.repository
        .createQueryBuilder('r')
        .orderBy('r.createdAt', 'DESC');

      if (pagination) {
        queryBuilder.skip(getOffset(filter)).take(limit);
      }

      return await queryBuilder.getManyAndCount();
    } catch (error) {
      throw error;
    }
  }

  async findOne(options: FindOneOptions<RoleEntity>) {
    return await this.repository.findOne(options);
  }
}
