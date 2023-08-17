import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TopicModule } from './topic/topic.module';
import { Topic } from './topic/entities/topic.entity';
import { UserAgent } from './user/entities/user-agent.entity';

const { MYSQL_DATABASE, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_HOST } =
  process.env;
console.log(MYSQL_PASSWORD);

@Module({
  imports: [
    // 配置.env
    ConfigModule.forRoot(),
    // 配置typeorm
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: MYSQL_HOST,
      port: 3306,
      username: MYSQL_USERNAME,
      password: MYSQL_PASSWORD || '123456',
      database: MYSQL_DATABASE,
      entities: [User, UserAgent, Topic],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    TopicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
