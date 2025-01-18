import { CommonFilter } from '@libs/common/base';
import { UserService } from '@libs/core/modules/user';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { instanceToPlain } from 'class-transformer';
import { ApiGlobalHeaders, BaseGroups, UserGroups } from 'libs/common';
import { BodyUserDto } from './dto/body-user.dto';
import { Equal } from 'typeorm';
import { JwtAuthGuard } from '@libs/common/auth';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('user')
@ApiTags('user')
@ApiGlobalHeaders()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async findAllAndCounted(@Query() filter: CommonFilter) {
    const { page, limit, getPageCount } = filter;
    const [users, count] = await this.userService.findAllUsers(filter);
    const data = instanceToPlain(users, { groups: [BaseGroups.VIEW, UserGroups.ACTION] });
    return {
      data: data,
      count,
      page,
      limit,
      pageCount: getPageCount(limit, count),
    };
  }

  @Get('/:id')
  async findOneUser(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.userService.findOneUser({ where: { id: Equal(id) } });
      const data = instanceToPlain(user, {
        groups: [BaseGroups.VIEW, UserGroups.LIST],
      });
      return {
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @Patch('/:id')
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: BodyUserDto) {
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
    await this.userService.removeUser(id);
    return {
      data: {},
    };
  }
}
