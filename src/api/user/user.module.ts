import { Module } from '@nestjs/common';
import { UserImplementService } from './user.service';
import { UserController } from './user.controller';
import {
  UserImplementRepository,
  UserRepository,
  UserService,
} from '@libs/core/modules/user';

@Module({
  providers: [
    UserImplementService,
    { provide: UserRepository, useClass: UserImplementRepository },
    { provide: UserService, useClass: UserImplementService },
  ],
  controllers: [UserController],
})
export class UserModule {}
