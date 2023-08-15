import { Injectable, NotFoundException } from '@nestjs/common';
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

  /**
   * 查找当前用户所有的文章,过滤掉deleted:true数据
   * @param id
   */
  async findAll(id: string) {
    return await this.topicRepository.find({
      where: { author_id: id, deleted: false },
    });
  }

  /**
   * id查找topic
   * @param id
   */
  async findOne(id: string) {
    const topic = await this.topicRepository.findOne({ where: { id } });
    if (!topic || topic.deleted) {
      throw new NotFoundException();
    }
    // 更新访问次数
    topic.visit_count += 1;
    await this.topicRepository.update(id, { visit_count: topic.visit_count });
    return topic;
  }

  /**
   * 更新topic
   * @param id
   * @param updateTopicDto
   */
  async update(id: string, updateTopicDto: UpdateTopicDto) {
    const topic = await this.topicRepository.findOne({
      where: { id, deleted: false },
    });
    if (!topic) {
      throw new NotFoundException();
    }
    await this.topicRepository.update(id, updateTopicDto);
    return `This action updates a #${id} topic`;
  }

  /**
   * delete topic
   * @param id
   */
  async remove(id: string) {
    const topic = await this.topicRepository.findOne({ where: { id } });
    if (!topic) {
      throw new NotFoundException();
    }
    await this.topicRepository.update(id, { deleted: true });
    return `This action removes a #${id} topic`;
  }
}
