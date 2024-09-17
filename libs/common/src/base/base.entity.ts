import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import {
  BaseEntity,
  BeforeUpdate,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BaseGroups } from '../groups';

export class CommonEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int4' })
  @Expose({ groups: [BaseGroups.VIEW] })
  @ApiProperty()
  id: number;

  @CreateDateColumn({
    type: 'timestamptz',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Expose({ groups: [BaseGroups.VIEW] })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @Expose({ groups: [BaseGroups.VIEW] })
  @ApiProperty()
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamptz', nullable: true })
  deletedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
