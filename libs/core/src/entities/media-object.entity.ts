import { CommonEntity } from 'libs/common';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'media_object' })
export class MediaObjectEntity extends CommonEntity {
  @Column()
  filename: string;

  @Column()
  originalFilename: string;

  @Column()
  alternativeText: string;

  @Column()
  width: string;

  @Column()
  height: string;

  @Column()
  mimeType: string;

  @Column()
  key: string;

  @Column()
  size: number;

  @Column()
  dueDate: Date;

  @Column()
  path: string;

  @Column()
  url: string;
}
