import { SetMetadata } from '@nestjs/common';

export interface IPermission {
  permission: 'ACTION' | 'VIEW' | 'ALL';
}

export const MENU_KEYS = 'menu';

export const MenuPermission = (permission: IPermission) =>
  SetMetadata(MENU_KEYS, permission);
