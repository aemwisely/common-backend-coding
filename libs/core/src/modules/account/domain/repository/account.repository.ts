import { BaseRepository } from '@libs/common/base';
import { UserEntity } from '@libs/core/entities';

export abstract class AccountRepository extends BaseRepository<UserEntity> {
  abstract findAccount(email: string): Promise<UserEntity>;
}
