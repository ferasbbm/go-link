import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LinksService } from 'src/modules/links/providers/links.service';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from '../dtos/login.dto';
import { AuthProvider } from './auth.provider';
import { RegisterDto } from '../dtos/register.dto';
import { identifyType } from '../utils/identifier.util';
import { IdentifyType } from 'src/common/enums/app.enums';

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

  async findByIdentifier(identifier: string): Promise<User> {
    const type: IdentifyType = identifyType(identifier);

    let user: User | null = null;

    switch (type) {
      case 'email':
        user = await this.userRepo.findOne({ where: { email: identifier } });
        break;
      case 'mobile':
        user = await this.userRepo.findOne({ where: { mobile: identifier } });
        break;
      case 'username':
        user = await this.userRepo.findOne({ where: { username: identifier } });
        break;
      default:
        throw new NotFoundException('Invalid identifier type');
    }

    if (!user)
      throw new NotFoundException(
        `User not found with identifier: ${identifier}`,
      );

    return user;
  }
}
