import { UserService } from '@libs/core/modules/user';
import { Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Equal } from 'typeorm';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  async findOneUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOneUser({ where: { id: Equal(id) } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      data: user,
    };
  }
}
