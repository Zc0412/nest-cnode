import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 注册
   * @param createUserDto
   */
  @Public()
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  /**
   * 擦护心用户信息
   * @param name
   */
  @Public()
  @Get(':name')
  getUser(@Param('name') name: string) {
    console.log(name);
    return this.userService.findOne(name);
  }
}
