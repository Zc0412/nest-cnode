import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformResponseInterceptor } from './transform/transform-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Pipe 管道
  app.useGlobalPipes(new ValidationPipe());
  // Interceptor 拦截器
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  // 监听端口
  await app.listen(process.env.PORT);
}

bootstrap();
