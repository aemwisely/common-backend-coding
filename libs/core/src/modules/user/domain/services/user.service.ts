import { UserEntity } from '@libs/core/entities';
import { FindOneOptions } from 'typeorm';

export abstract class UserService {
  abstract findOneUser(options: FindOneOptions<UserEntity>): Promise<UserEntity>;
}
