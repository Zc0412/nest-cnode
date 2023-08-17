import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as utility from 'utility';
import { cryptoPassword } from '../utils/cryptoUtil';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

import { UserAgent } from './entities/user-agent.entity';
import { UaDto } from './dto/ua.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(UserAgent)
    private userAgentRepository: Repository<UserAgent>,
    private jwtService: JwtService,
  ) {}

  /**
   * 注册用户
   * @param createUser
   * @param ua
   */
  async create(createUser: CreateUserDto, ua: UaDto) {
    const { login_name, pass, email } = createUser;
    const loginName = await this.userRepository.findOne({
      where: { login_name },
    });
    // 用户名已存在
    if (loginName) {
      throw new HttpException(
        'The user name already exists',
        HttpStatus.FORBIDDEN,
      );
    }
    // 头像 来源https://www.gravatar.com
    const avatar = this.makeGravatar(email);
    // 保存ua
    const createUA = await this.userAgentRepository.create(ua);
    // 添加user其他信息 密码加密
    const user = {
      ...createUser,
      pass: cryptoPassword(pass),
      name: createUser.login_name,
      avatar,
      user_agent: createUA,
    };
    await this.userAgentRepository.save(createUA);
    // 保存用户数据
    const resultUser = await this.userRepository.create(user);
    const saveUser = await this.userRepository.save(resultUser);
    const payload = { id: saveUser.id, username: saveUser.login_name };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  /**
   * 查找user
   * @param login_name
   */
  async findOne(login_name: string): Promise<User> {
    return await this.userRepository.findOne({ where: { login_name } });
  }

  /**
   * 更新积分
   * @param id
   */
  async updateScore(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    user.score += 5;
    await this.userRepository.update(id, { score: user.score });
  }

  /**
   * 生成头像
   * @param email
   */
  makeGravatar(email: string) {
    return `https://www.gravatar.com/avatar/${utility.md5(
      email.toLowerCase(),
    )}?d=retro&f=y&s=200`;
  }
}
