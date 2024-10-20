import { CommonFilter } from '@libs/common/base';
import { UserService } from '@libs/core/modules/user';
import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { instanceToPlain } from 'class-transformer';
import { ApiGlobalHeaders, BaseGroups, UserGroups } from 'libs/common';
import { Equal } from 'typeorm';
import { BodyUserDto } from './dto/body-user.dto';

@Controller('user')
@ApiTags('user')
@ApiGlobalHeaders()
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
    try {
    } catch (error) {
      throw error;
    }
  }

  @Patch('/:id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Query() body: BodyUserDto) {
    try {
      const user = await this.userService.updateUser(id, body);
      const data = instanceToPlain(user, {
        groups: [BaseGroups.VIEW, UserGroups.LIST],
      });
      return {
        data: data,
      };
    } catch (error) {
      throw error;
    }
  }

  @Delete('/:id')
  async removeUser(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.userService.removeUser(id);
      return {
        data: {},
      };
    } catch (error) {
      throw error;
    }
  }
}
