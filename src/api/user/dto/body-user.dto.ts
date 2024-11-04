import { ApiProperty } from '@nestjs/swagger';

export class BodyUserDto {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  email: string;
}
