import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Pipe
  app.useGlobalPipes(new ValidationPipe());
  // 监听端口
  await app.listen(process.env.PORT);
}

bootstrap();
