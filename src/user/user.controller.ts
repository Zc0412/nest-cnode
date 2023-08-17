import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Request,
  Ip,
} from '@nestjs/common';
import * as parser from 'ua-parser-js';
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
   * @param req
   * @param ip
   */
  @Public()
  @Post('register')
  create(@Body() createUserDto: CreateUserDto, @Request() req, @Ip() ip) {
    // 获取ua
    const userAgentDetail = parser(req.headers['user-agent']);
    const userAgent = {
      ua:userAgentDetail.ua,
      browser_name:userAgentDetail.browser.name,
      browser_version:userAgentDetail.browser.version,
      engine_name:userAgentDetail.engine.name,
      engine_version:userAgentDetail.engine.version,
      os_name:userAgentDetail.os.name,
      os_version:userAgentDetail.os.version,
      device_vendor:userAgentDetail.device.vendor,
      device_model:userAgentDetail.device.model,
      ip
    }
    return this.userService.create(createUserDto,userAgent);
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
