import { Controller, Get } from '@nestjs/common';

@Controller('inventory')
export class InventoryController {
  @Get()
  getHello(): string {
    return 'Hello, NestJS!';
  }
}
