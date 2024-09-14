import { CommonEntity } from '@libs/common/base';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends CommonEntity {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  isActive: boolean;
}
