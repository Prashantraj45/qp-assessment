import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/token')
  getAccessToken(@Query() query: { userId: string; password: string }) {
    return this.userService.getAccessToken(query);
  }
  @Get('/details/:userId')
  getUserDetails(@Param('userId') userId: string) {
    return this.userService.getUserDetails(userId);
  }
  @Post('/create')
  createUser(@Body() body: { name: string; email: string; password: string }) {
    return this.userService.createOne(body);
  }
}
