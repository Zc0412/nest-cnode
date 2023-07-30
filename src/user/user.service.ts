import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { cryptoPassword } from '../utils/cryptoUtil';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
    const newUser = await this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  /**
   * 查找user
   * @param login_name
   */
  async findOne(login_name: string) {
    return await this.userRepository.findOne({ where: { login_name } });
  }
}
