import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: true })
  isActive: boolean;
}
