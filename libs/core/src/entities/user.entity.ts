import { Exclude, Expose } from 'class-transformer';
import { CommonEntity, UserGroups } from 'libs/common';
import { Column, Entity, ManyToOne } from 'typeorm';
import { MediaObjectEntity } from './media-object.entity';
import { RoleEntity } from './role.entity';

@Entity({ name: 'user' })
export class UserEntity extends CommonEntity {
  @Column()
  @Expose({ groups: [UserGroups.ACTION, UserGroups.LIST] })
  firstName: string;

  @Column()
  @Expose({ groups: [UserGroups.ACTION, UserGroups.LIST] })
  lastName: string;

  @Column()
  @Expose({ groups: [UserGroups.ACTION, UserGroups.LIST] })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Expose({ groups: [UserGroups.ACTION, UserGroups.LIST] })
  isActive: boolean;

  @ManyToOne(() => MediaObjectEntity)
  profileImage: MediaObjectEntity;

  @Column()
  @Exclude()
  profileImageId: number;

  @ManyToOne(() => RoleEntity)
  role: RoleEntity;

  @Column()
  @Exclude()
  roleId: number;
}
