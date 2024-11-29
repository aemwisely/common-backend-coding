import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create.role.dto';
import { instanceToPlain } from 'class-transformer';
import { BaseGroups, CommonFilter, ReturningTranslator, RoleGroup } from 'libs/common';
import { Equal } from 'typeorm';

@Controller('role')
@ApiTags('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @Post('/')
  async createRole(@Body() body: CreateRoleDto) {
    try {
      const roleObj = await this.roleService.createRole(body);

      const data = instanceToPlain(roleObj, { groups: [BaseGroups.VIEW, RoleGroup.ALL] });
      return {
        data,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('/')
  async findAllAndCountedRole(@Query() filter: CommonFilter) {
    try {
      const { page, getPageCount, limit } = filter;
      const [roleObjs, count] = await this.roleService.findAllAndCountedRole(filter);

      const data = instanceToPlain(roleObjs, {
        groups: [BaseGroups.VIEW, RoleGroup.ALL],
      });
      return {
        data,
        count,
        page,
        limit,
        pageCount: getPageCount(limit, count),
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const roleObj = await this.roleService.findOne({ where: { id: Equal(id) } });

      if (!roleObj) {
        throw new NotFoundException(ReturningTranslator('common.data-not-found'));
      }
    } catch (error) {
      throw error;
    }
  }
}
