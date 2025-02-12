import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { ApiResponse } from 'src/common/utils/api-response.util';
import { AuthGuard } from '@nestjs/passport';
import { IApiResponse } from 'src/common/interfaces/api-response.interface';
import { UserInterface } from './interfaces/user.interface';
import { User } from './entities/user.entity';
import { UserTransformer } from './transformers/user.transformer';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async profile(@Req() req: any): Promise<IApiResponse<UserInterface>> {
    const authUserProfile: User = await this.userService.findByIdentifier(
      req.user.username,
    );
    const finalUser: UserInterface = UserTransformer.make(authUserProfile);

    return ApiResponse.success(finalUser);
  }
}
