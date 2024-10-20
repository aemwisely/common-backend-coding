import {
  FindManyOptions,
  FindOneOptions,
  SelectQueryBuilder,
  DeepPartial,
  UpdateResult,
} from 'typeorm';
import { CommonEntity } from './base.entity';
import { CommonFilter } from './common-filter';

export abstract class BaseRepository<T extends CommonEntity> {
  abstract find(options?: FindManyOptions<T>): Promise<T[]>;
  findOneById?(id: number): Promise<T>;
  create?(entity: Partial<T>): T;
  save?(entity: T): Promise<T>;
  abstract findOne(options: FindOneOptions<T>): Promise<T>;
  createQueryBuilder?(
    alias: string,
    filter?: Partial<CommonFilter>,
  ): SelectQueryBuilder<T>;
  merge?(entity: T, body: DeepPartial<T>): T;
  update?(id: number, body: DeepPartial<T>): Promise<UpdateResult>;
  delete?(id: number): Promise<boolean>;
}
