import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Equal } from 'typeorm';
import { IJwtUserDecorator } from '../decorator/jwt.decorator';
import { UserEntity } from '@libs/core/entities';
import { Reflector } from '@nestjs/core';
import { IPermission, MENU_KEYS } from '../decorator';

export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    @InjectDataSource() private datasource: DataSource,
    private reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;

    if (!result) {
      throw new UnauthorizedException();
    }

    const request = context.switchToHttp().getRequest();
    const userAction = request?.user as IJwtUserDecorator;

    const actioner = await this.validateActionerById(userAction);
    return await this.validatePermissionMenu(context, actioner);
  }

  private async validateActionerById(userAction: IJwtUserDecorator) {
    const { id } = userAction?.data;

    const findActioner = await this.datasource.manager.findOne(UserEntity, {
      where: { id: Equal(id), isActive: true },
      relations: { role: { roleMenus: true } },
    });

    if (!findActioner) {
      throw new UnauthorizedException();
    }

    return findActioner;
  }

  private async validatePermissionMenu(
    context: ExecutionContext,
    userEntity: UserEntity,
  ) {
    const requiredPermission = this.reflector.getAllAndOverride<IPermission>(MENU_KEYS, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermission) {
      return true;
    }

    return await this.validatePermissionAction(requiredPermission, userEntity);
  }

  private async validatePermissionAction(menu: IPermission, userEntity: UserEntity) {
    const { permission, menu: title } = menu;

    const role = userEntity?.role;

    if (!role) {
      return false;
    }

    const findMenu = role?.roleMenus?.find(
      (roleMenu) => roleMenu?.menu?.title === title && roleMenu?.isActive,
    );

    if (!findMenu || findMenu?.permission === 'NONE') {
      return false;
    }

    return true;
  }
}
