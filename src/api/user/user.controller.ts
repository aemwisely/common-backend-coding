import { Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Equal } from 'typeorm';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  async findOneUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne({ where: { id: Equal(id) } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      data: user,
    };
  }
}
