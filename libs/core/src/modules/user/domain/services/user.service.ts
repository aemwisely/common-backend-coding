import { CommonFilter } from '@libs/common/base';
import { UserEntity } from '@libs/core/entities';
import { FindOneOptions } from 'typeorm';

export abstract class UserService {
  abstract findOneUser(options: FindOneOptions<UserEntity>): Promise<UserEntity>;
  abstract findAllUsers(filter: CommonFilter): Promise<[UserEntity[], number]>;
  abstract updateUser(id: number, data: Partial<UserEntity>): Promise<UserEntity>;
  abstract removeUser(id: number): Promise<boolean>;
}
