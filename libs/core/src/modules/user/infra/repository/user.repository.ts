import { InjectDataSource } from '@nestjs/typeorm';
import { UserRepository } from '../../domain';
import {
  DataSource,
  DeepPartial,
  Equal,
  FindManyOptions,
  FindOneOptions,
  Repository,
  SelectQueryBuilder,
  UpdateResult,
} from 'typeorm';
import { UserEntity } from '@libs/core/entities';
import { CommonFilter } from '@libs/common/base';

export class UserImplementRepository extends UserRepository {
  private repository: Repository<UserEntity>;
  constructor(
    @InjectDataSource()
    private datasource: DataSource,
  ) {
    super();
    this.repository = this.datasource.getRepository(UserEntity);
  }

  create(entity: Partial<UserEntity>): UserEntity {
    return this.repository.create(entity);
  }

  async findOne(options: FindOneOptions<UserEntity>): Promise<UserEntity> {
    return await this.repository.findOne(options);
  }

  async find(options?: FindManyOptions<UserEntity>): Promise<UserEntity[]> {
    return await this.repository.find(options);
  }

  async save(entity: UserEntity): Promise<UserEntity> {
    return await this.repository.save(entity);
  }

  createQueryBuilder(
    alias: string,
    filter?: Partial<CommonFilter>,
  ): SelectQueryBuilder<UserEntity> {
    const queryBuilder = this.repository.createQueryBuilder(alias);

    if (filter?.pagination) {
      queryBuilder.skip(filter?.getOffset(filter as CommonFilter)).take(filter?.limit);
    }

    return queryBuilder;
  }

  merge(entity: UserEntity, body: DeepPartial<UserEntity>): UserEntity {
    return this.repository.merge(entity, body);
  }

  async update(id: number, body: DeepPartial<UserEntity>): Promise<UpdateResult> {
    return await this.repository.update({ id: Equal(id) }, body);
  }

  async delete(id: number): Promise<boolean> {
    const findOne = await this.repository.findOne({ where: { id: Equal(id) } });

    if (findOne) {
      await this.repository.softDelete({ id: Equal(id) });
    }

    return true;
  }
}
