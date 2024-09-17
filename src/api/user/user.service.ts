import { UserEntity } from '@libs/core/entities';
import { UserRepository, UserService } from '@libs/core/modules/user';
import { Injectable } from '@nestjs/common';
import { FindOneOptions } from 'typeorm';

@Injectable()
export class UserImplementService extends UserService {
  constructor(private userRepository: UserRepository) {
    super();
  }

  async findOneUser(options: FindOneOptions<UserEntity>): Promise<UserEntity> {
    return await this.userRepository.findOne(options);
  }
}
