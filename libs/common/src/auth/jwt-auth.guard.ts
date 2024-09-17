import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Equal } from 'typeorm';
import { IJwtUserDecorator } from './jwt.decorator';
import { UserEntity } from '@libs/core/entities';
import dayjs from '../shared/dayjs';

export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(@InjectDataSource() private datasource: DataSource) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    if (!result) {
      throw new UnauthorizedException();
    }

    const request = context.switchToHttp().getRequest();
    const userAction = request?.user as IJwtUserDecorator;
    await this.validatePermissionActioner(userAction);
    return result;
  }

  private async validatePermissionActioner(userAction: IJwtUserDecorator) {
    const { id } = userAction?.data;

    const findActioner = await this.datasource.manager.findOne(UserEntity, {
      where: { id: Equal(id) },
    });

    if (!findActioner) {
      throw new UnauthorizedException();
    }

    if (!findActioner?.isActive) {
      throw new ForbiddenException('Inactive user');
    }

    return true;
  }
}
