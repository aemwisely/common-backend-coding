import { IJwtUserDecorator } from '@libs/common/auth';
import { UserEntity } from '@libs/core/entities';
import { AccountAggregate, AccountRepository, AccountService } from '@libs/core/modules';
import { UserRepository } from '@libs/core/modules/user';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hashPassword } from 'libs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { Equal } from 'typeorm';

@Injectable()
export class AuthenService extends AccountService {
  constructor(
    private jwtService: JwtService,
    private accountRepository: AccountRepository,
    private userRepository: UserRepository,
    private i18nService: I18nService,
  ) {
    super();
  }

  async login(email: string, password: string): Promise<string> {
    const findAccount = await this.accountRepository.findAccount(email);

    if (!findAccount) {
      throw new NotFoundException(this.i18nService.t('common.data-not-found'));
    }

    const accountAggregate = AccountAggregate.createAccountAggregate(
      findAccount,
      this.jwtService,
    );
    const validateAccount = await this.validateAccount(accountAggregate, password);
    if (!validateAccount) {
      throw new BadRequestException(this.i18nService.t('common.invalid-password'));
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
  ): Promise<string> {
    const findUser = await this.accountRepository.findAccount(email);

    if (findUser) {
      throw new BadRequestException(this.i18nService.t('common.data-already-exists'));
    }

    const createUserAccount = this.userRepository.create({
      email,
      firstName,
      lastName,
      password: await hashPassword(password),
    });

    await this.userRepository.save(createUserAccount);

    const token = await this.login(email, password);
    return token;
  }

  async findSelfAccount(jwtActioner: IJwtUserDecorator): Promise<UserEntity> {
    const { id } = jwtActioner?.data;

    const findUser = await this.userRepository.findOne({
      where: { id: Equal(id) },
    });

    if (!findUser) {
      throw new NotFoundException(this.i18nService.t('common.data-not-found'));
    }

    return findUser;
  }
}
