import { CommonFilter } from '@libs/common/base';
import { UserService } from '@libs/core/modules/user';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { instanceToPlain } from 'class-transformer';
import { BaseGroups, UserGroups } from 'libs/common';
import { Equal } from 'typeorm';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async findAllAndCounted(@Query() filter: CommonFilter) {
    const { page, limit, getPageCount } = filter;
    const [users, total] = await this.userService.findAllUsers(filter);
    const data = instanceToPlain(users, { groups: [BaseGroups.VIEW, UserGroups.ACTION] });
    return {
      data: data,
      total,
      page,
      limit,
      pageCount: getPageCount(limit, total),
    };
  }

  @Get('/:id')
  async findOneUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOneUser({ where: { id: Equal(id) } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const data = instanceToPlain(user, { groups: [BaseGroups.VIEW, UserGroups.LIST] });
    return {
      data: data,
    };
  }
}
