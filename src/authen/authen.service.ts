import { IJwtUserDecorator } from '@libs/common/decorator';
import { UserEntity } from '@libs/core/entities';
import { AccountAggregate, AccountRepository, AccountService } from '@libs/core/modules';
import { UserRepository } from '@libs/core/modules/user';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hashPassword, ReturningTranslator } from 'libs/common';
import { Equal } from 'typeorm';

@Injectable()
export class AuthenService extends AccountService {
  constructor(
    private jwtService: JwtService,
    private accountRepository: AccountRepository,
    private userRepository: UserRepository,
  ) {
    super();
  }

  async login(email: string, password: string): Promise<string> {
    const findAccount = await this.accountRepository.findAccount(email);

    if (!findAccount) {
      throw new NotFoundException(ReturningTranslator('common.data-not-found'));
    }

    const accountAggregate = AccountAggregate.createAccountAggregate(
      findAccount,
      this.jwtService,
    );
    const validateAccount = await this.validateAccount(accountAggregate, password);
    if (!validateAccount) {
      throw new BadRequestException(ReturningTranslator('common.invalid-password'));
    }
    const payload = accountAggregate.getPayload();
    const token = accountAggregate.getToken(payload);

    return token;
  }

  async validateAccount(
    accountAggregate: AccountAggregate,
    password: string,
  ): Promise<boolean> {
    const validateAccount = accountAggregate.validatePassword(password);

    return validateAccount;
  }

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ): Promise<boolean> {
    const findUser = await this.accountRepository.findAccount(email);

    if (findUser) {
      throw new BadRequestException(ReturningTranslator('common.data-already-exists'));
    }

    const createUserAccount = this.userRepository.create({
      email,
      firstName,
      lastName,
      password: await hashPassword(password),
      isActive: false,
    });

    await this.userRepository.save(createUserAccount);

    return true;
  }

  async findSelfAccount(jwtActioner: IJwtUserDecorator): Promise<UserEntity> {
    const { id } = jwtActioner?.data;

    const findUser = await this.userRepository.findOne({
      where: { id: Equal(id) },
    });

    if (!findUser) {
      throw new NotFoundException(ReturningTranslator('common.data-not-found'));
    }

    return findUser;
  }
}
