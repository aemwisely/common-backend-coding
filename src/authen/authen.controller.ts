import { AccountService } from '@libs/core/modules';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto, RegisterDto } from './dto/login.dto';
import { instanceToPlain } from 'class-transformer';
import { ApiGlobalHeaders, BaseGroups, UserGroups } from 'libs/common';
import { IJwtUserDecorator, JwtDecorator, MenuPermission } from '@libs/common/decorator';
import { JwtAuthGuard } from '@libs/common/auth';

@Controller('auth')
@ApiGlobalHeaders()
@ApiTags('authorized')
export class AuthenController {
  constructor(private authService: AccountService) {}

  @Post('/register')
  async register(@Body() body: RegisterDto) {
    try {
      await this.authService.register(
        body.email,
        body.password,
        body.firstName,
        body.lastName,
      );
      return {
        data: {},
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('/login')
  async login(@Body() body: LoginDto) {
    try {
      const token = await this.authService.login(body.email, body.password);
      return {
        data: {
          accessToken: token,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @MenuPermission({ permission: 'VIEW' })
  @ApiBearerAuth()
  async findMe(@JwtDecorator() jwtActioner: IJwtUserDecorator) {
    try {
      const findUserAccount = await this.authService.findSelfAccount(jwtActioner);
      const data = instanceToPlain(findUserAccount, {
        groups: [BaseGroups.VIEW, UserGroups.ACTION],
      });
      return {
        data: data,
      };
    } catch (error) {
      throw error;
    }
  }
}
