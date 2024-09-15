import { AccountAggregate, AccountRepository, AccountService } from '@libs/core/modules';
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenService extends AccountService {
  constructor(private jwtService: JwtService, private accountRepository: AccountRepository) {
    super();
  }

  async login(email: string, password: string): Promise<string> {
    const findAccount = await this.accountRepository.findAccount(email);

    if (!findAccount) {
      throw new NotFoundException('Account not found');
    }

    const accountAggregate = AccountAggregate.createAccountAggregate(findAccount);
    const payload = accountAggregate.getPayload();
    const token = accountAggregate.getToken(payload);

    return token;
  }

  async validateAccount(email: string, password: string): Promise<boolean> {
    return;
  }
}
