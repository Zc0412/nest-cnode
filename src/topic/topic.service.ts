import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic) private topicRepository: Repository<Topic>,
    private readonly userService: UserService,
  ) {}

  /**
   * 创建topic
   * @param createTopicDto
   * @param id
   */
  async create(createTopicDto: CreateTopicDto, id: string) {
    const topic = { ...createTopicDto, author_id: id };
    const createTopic = await this.topicRepository.create(topic);
    const saveTopic = await this.topicRepository.save(createTopic);
    await this.userService.updateScore(id);
    return saveTopic;
  }

  findAll() {
    return `This action returns all topic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} topic`;
  }

  update(id: number, updateTopicDto: UpdateTopicDto) {
    return `This action updates a #${id} topic`;
  }

  remove(id: number) {
    return `This action removes a #${id} topic`;
  }
}
