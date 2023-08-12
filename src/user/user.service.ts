import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { cryptoPassword } from '../utils/cryptoUtil';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /**
   * 注册用户
   * @param createUser
   */
  async create(createUser: CreateUserDto) {
    const { login_name, pass } = createUser;
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
    // 添加user其他信息 密码加密
    const user = {
      ...createUser,
      pass: cryptoPassword(pass),
      name: createUser.login_name,
      avatar: 'https://randomuser.me/api/portraits/lego/0.jpg',
    };
    const resultUser = await this.userRepository.create(user);
    const saveUser = await this.userRepository.save(resultUser);
    const payload = { sub: saveUser.id, username: saveUser.login_name };
    return { access_token: await this.jwtService.signAsync(payload) };
  }

  /**
   * 查找user
   * @param login_name
   */
  async findOne(login_name: string): Promise<User> {
    return await this.userRepository.findOne({ where: { login_name } });
  }
}
