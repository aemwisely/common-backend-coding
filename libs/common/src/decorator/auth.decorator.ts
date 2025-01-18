import { SetMetadata } from '@nestjs/common';

export interface IPermission {
  menu?: string;
  permission: 'ACTION' | 'VIEW';
}

export const MENU_KEYS = 'menu';

export const MenuPermission = (permission: IPermission) =>
  SetMetadata(MENU_KEYS, permission);
