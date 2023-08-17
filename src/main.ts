import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TransformResponseInterceptor } from './core/interceptor/transform-response.interceptor';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { HttpExceptionFilter } from './core/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Pipe 管道 Validation
  app.useGlobalPipes(new ValidationPipe());
  // Interceptor 拦截器
  app.useGlobalInterceptors(new TransformResponseInterceptor());
  // Filter 异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // assets 静态资源
  app.useStaticAssets(join(__dirname, '..', 'public'));
  // view
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // hbs 模板引擎
  app.setViewEngine('hbs');
  // 监听端口
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
