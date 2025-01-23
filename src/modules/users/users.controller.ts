import { Controller } from '@nestjs/common';
import { UsersService } from './providers/users.service';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UsersService) {}
}
