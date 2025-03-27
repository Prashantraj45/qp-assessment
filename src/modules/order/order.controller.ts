import { Controller, Get } from '@nestjs/common';

@Controller('order')
export class OrderController {
  @Get()
  getHello(): string {
    return 'Hello, NestJS!';
  }
}
