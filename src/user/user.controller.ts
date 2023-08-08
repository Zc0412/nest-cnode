import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from '../auth/decorators/public.decorator';
import { UserInfoVo } from './vo/user-info.vo';

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
   * 查询用户信息
   * @param name
   */
  @Public()
  @Get(':name')
  async getUser(@Param('name') name: string) {
    const user = await this.userService.findOne(name);
    const userInfoVo = new UserInfoVo();
    userInfoVo.id = user.id;
    userInfoVo.name = user.name;
    userInfoVo.login_name = user.login_name;
    userInfoVo.avatar = user.avatar;
    userInfoVo.email = user.email;
    userInfoVo.create_at = user.create_at;
    userInfoVo.update_at = user.update_at;
    return userInfoVo;
  }
}
