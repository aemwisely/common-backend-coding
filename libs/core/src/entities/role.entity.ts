import { RoleGroup } from '@libs/common/groups';
import { Exclude, Expose } from 'class-transformer';
import { CommonEntity } from 'libs/common';
import { Column, Entity, OneToMany } from 'typeorm';
import { RoleMenuEntity } from './role-menu.entity';

@Entity({ name: 'role' })
export class RoleEntity extends CommonEntity {
  @Column()
  @Expose({ groups: [RoleGroup.ALL] })
  title: string;

  @Column()
  @Expose({ groups: [RoleGroup.ALL] })
  isActive: boolean;

  @Column()
  @Exclude()
  prefix: string;

  @OneToMany(() => RoleMenuEntity, (roleMenu) => roleMenu.role, { cascade: true })
  roleMenus: RoleMenuEntity[];
}
