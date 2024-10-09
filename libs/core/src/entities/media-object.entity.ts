import { CommonEntity } from 'libs/common';
import { Entity } from 'typeorm';

@Entity({ name: 'media_object' })
export class MediaObjectEntity extends CommonEntity {}
