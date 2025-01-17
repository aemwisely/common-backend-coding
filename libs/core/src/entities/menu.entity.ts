import { CommonEntity } from 'libs/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { RoleMenuEntity } from './role-menu.entity';

@Entity({ name: 'menu' })
export class MenuEntity extends CommonEntity {
  @Column()
  title: string;

  @Column()
  code: string;

  @Column({ default: false, nullable: false })
  isActive: boolean;

  @OneToMany(() => RoleMenuEntity, (roleMenu) => roleMenu.menu, { cascade: true })
  roleMenus: RoleMenuEntity[];
}
