import { CommonEntity } from 'libs/common';
import { Entity, ManyToOne } from 'typeorm';
import { RoleEntity } from './role.entity';
import { MenuEntity } from './menu.entity';

@Entity({ name: 'role_menu' })
export class RoleMenuEntity extends CommonEntity {
  @ManyToOne(() => RoleEntity, { onDelete: 'CASCADE' })
  role: RoleEntity;

  @ManyToOne(() => MenuEntity, { onDelete: 'CASCADE' })
  menu: MenuEntity;
}
