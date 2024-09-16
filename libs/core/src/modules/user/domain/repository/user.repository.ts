import { BaseRepository } from '@libs/common/base';
import { UserEntity } from '@libs/core/entities';

export abstract class UserRepository extends BaseRepository<UserEntity> {}
