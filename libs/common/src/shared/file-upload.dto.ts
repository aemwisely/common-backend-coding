import { ApiProperty } from '@nestjs/swagger';

export class FileUpload {
  @ApiProperty({ type: 'file', required: true })
  file: Express.Multer.File;

  @ApiProperty({ type: 'string', required: false, default: '' })
  alternativeText: string = '';

  @ApiProperty({ type: 'string', required: false, default: '' })
  width: string = '';

  @ApiProperty({ type: 'string', required: false, default: '' })
  height: string = '';

  @ApiProperty({ type: 'string', required: false, default: '' })
  key: string = '';
}
