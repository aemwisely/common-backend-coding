import { Module } from '@nestjs/common';
import { AuthenController } from './authen.controller';
import { AuthenService } from './authen.service';
import { JwtModule } from '@nestjs/jwt';
import { readFileSync } from 'fs';
import { join } from 'path';
import { JwtStrategy } from '@libs/common/auth';
import { PassportModule } from '@nestjs/passport';
import { AccountImplementRepository, AccountRepository, AccountService } from '@libs/core/modules';

@Module({
  imports: [
    JwtModule.register({
      privateKey: readFileSync(join('.', 'rsa.private'), 'utf8'),
      signOptions: {
        algorithm: 'RS256',
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthenController],
  providers: [
    AuthenService,
    JwtStrategy,
    { provide: AccountRepository, useClass: AccountImplementRepository },
    { provide: AccountService, useClass: AuthenService },
  ],
})
export class AuthModule {}
