import { ApiProperty } from '@nestjs/swagger';

export class FileUpload {
  @ApiProperty({ type: 'file', required: true })
  file: Express.Multer.File;

  @ApiProperty({ type: 'string', required: false })
  alternativeText: string;

  @ApiProperty({ type: 'string', required: false })
  width: string;

  @ApiProperty({ type: 'string', required: false })
  height: string;

  @ApiProperty({ type: 'string', required: false })
  key: string;
}
