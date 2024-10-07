import { CommonFilter } from '@libs/common/base';
import { UserEntity } from '@libs/core/entities';
import { UserRepository, UserService } from '@libs/core/modules/user';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturningTranslator } from 'libs/common';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class UserImplementService extends UserService {
  constructor(private userRepository: UserRepository) {
    super();
  }

  async findOneUser(options: FindOneOptions<UserEntity>): Promise<UserEntity> {
    const user = await this.userRepository.findOne(options);

    if (!user) {
      throw new NotFoundException(ReturningTranslator('common.data-not-found'));
    }

    return user;
  }

  async findAllUsers(filter: CommonFilter): Promise<[UserEntity[], number]> {
    const queryBuilder = this.userRepository.createQueryBuilder('user', filter);

    return await queryBuilder.getManyAndCount();
  }
}
