import { AccountService } from '@libs/core/modules';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags('Authorized')
export class AuthenController {
  constructor(private authService: AccountService) {}

  @Post('/login')
  async login(@Body() body: LoginDto) {
    const token = await this.authService.login(body.email, body.password);
    return {
      accessToken: token,
    };
  }
}
