import { CommonFilter } from '@libs/common/base';
import { UserEntity } from '@libs/core/entities';
import { UserRepository, UserService } from '@libs/core/modules/user';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ReturningTranslator } from 'libs/common';
import { Equal, FindOneOptions } from 'typeorm';

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

  async updateUser(id: number, data: Partial<UserEntity>): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOne({ where: { id: Equal(id) } });

      const updatedUser = this.userRepository.merge(user, data);

      return await this.userRepository.save(updatedUser);
    } catch (error) {
      throw error;
    }
  }

  async removeUser(id: number): Promise<boolean> {
    try {
      await this.userRepository.delete(id);

      return true;
    } catch (error) {
      throw error;
    }
  }
}
