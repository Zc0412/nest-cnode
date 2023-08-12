import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/signin-auth.dto';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() sigInDto: SignInAuthDto) {
    return await this.authService.signIn(sigInDto.login_name, sigInDto.pass);
  }

  @Roles()
  @Get()
  getProfile(@Request() req) {
    console.log(req.user);
    return req.user;
  }
}
