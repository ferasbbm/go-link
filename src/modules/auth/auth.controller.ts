import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from 'src/common/utils/api-response.util';
import { UserInterface } from '../users/interfaces/user.interface';
import { IApiResponse } from 'src/common/interfaces/api-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<IApiResponse<UserInterface>> {
    const user: UserInterface = await this.authService.register(registerDto);

    return ApiResponse.success<UserInterface>(
      user,
      'you are registered successfully!',
      HttpStatus.CREATED,
    );
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<IApiResponse<UserInterface>> {
    const authUser: UserInterface = await this.authService.login(
      loginDto.username,
      loginDto.password,
    );

    return ApiResponse.success<UserInterface>(
      authUser,
      `Welcome back ${authUser.username}`,
      HttpStatus.OK,
    );
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  logout(@Req() req) {
    return this.authService.logout(req.user);
  }
}
