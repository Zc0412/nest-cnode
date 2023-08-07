import { Controller, Get, Render } from '@nestjs/common';
// import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  @Render('index.hbs')
  root() {
    return 'Cnode backend api';
  }
}
