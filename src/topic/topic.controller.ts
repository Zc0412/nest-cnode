import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { TopicService } from './topic.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Controller('topic')
export class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  create(@Body() createTopicDto: CreateTopicDto, @Request() req) {
    return this.topicService.create(createTopicDto, req.user.id);
  }

  @Get()
  findAll(@Request() req) {
    return this.topicService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    return this.topicService.update(id, updateTopicDto);
  }

  @Patch(':id/top')
  updateTop(@Param('id') id: string) {
    return this.topicService.updateTop(id);
  }

  @Patch(':id/good')
  updateGood(@Param('id') id: string) {
    return this.topicService.updateGood(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicService.remove(id);
  }
}
