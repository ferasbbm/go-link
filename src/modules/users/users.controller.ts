import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post('auth/register')
  register(@Body() registerDto: RegisterDto) {
    return this.userService.login(registerDto);
  }

  @Post('auth/login')
  login(@Body() loginDto: LoginDto) {
    return this.userService.login(loginDto);
  }

  @Get('')
  @HttpCode(HttpStatus.OK)
  async listMyLinks() {
    return this.userService.getMyLinks(1);
  }
}
