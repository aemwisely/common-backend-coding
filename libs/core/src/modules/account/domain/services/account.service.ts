import { IJwtUserDecorator } from '@libs/common/decorator';
import { AccountAggregate } from '../aggregate';
import { UserEntity } from '@libs/core/entities';

export abstract class AccountService {
  abstract login(email: string, password: string): Promise<string>;

  abstract validateAccount(
    accountAggregate: AccountAggregate,
    password: string,
  ): Promise<boolean>;

  abstract register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<boolean>;

  abstract findSelfAccount(jwtActioner: IJwtUserDecorator): Promise<UserEntity>;
}
