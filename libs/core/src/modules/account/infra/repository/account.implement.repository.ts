import { DataSource, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { AccountRepository } from '../../domain/repository/account.repository';
import { UserEntity } from '@libs/core/entities';
import { InjectDataSource } from '@nestjs/typeorm';

export class AccountImplementRepository extends AccountRepository {
  private repository: Repository<UserEntity>;

  constructor(@InjectDataSource() private datasource: DataSource) {
    super();
    this.repository = this.datasource.getRepository(UserEntity);
  }

  async find(options?: FindManyOptions<UserEntity>): Promise<UserEntity[]> {
    return await this.repository.find(options);
  }

  async findOne(options: FindOneOptions<UserEntity>): Promise<UserEntity> {
    return await this.repository.findOne(options);
  }

  async findAccount(email: string): Promise<UserEntity> {
    return await this.repository.findOne({ where: { email: email } });
  }
}
