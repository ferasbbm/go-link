import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { LinksService } from 'src/modules/links/providers/links.service';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from '../dtos/login.dto';
import { AuthProvider } from './auth.provider';
import { RegisterDto } from '../dtos/register.dto';

@Injectable({})
export class UsersService {
  constructor(
    private readonly linkService: LinksService,
    @Inject(forwardRef(() => AuthProvider)) // Use forwardRef here
    private authProvider: AuthProvider,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  login(dto: LoginDto) {
    return this.authProvider.signin(dto.username, dto.password);
  }

  register(registerDto: RegisterDto) {
    return this.authProvider.signup(registerDto);
  }

  async getMyLinks(userId: number) {
    const authUser: User = await this.userRepo.findOneBy({ id: userId });
    const userLinks = await this.linkService.getLinksByUserId(authUser);

    return userLinks;
  }

  // findByIdentifier(identifier: string) {}
}
