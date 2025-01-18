import { Injectable } from '@nestjs/common';
import { LinksService } from 'src/modules/links/providers/links.service';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from '../dtos/login.dto';

@Injectable({})
export class UsersService {
  constructor(
    private readonly linkService: LinksService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  login(loginDto: LoginDto) {
    return loginDto;
  }

  async getMyLinks(userId: number) {
    const authUser: User = await this.userRepo.findOneBy({ id: userId });
    const userLinks = await this.linkService.getLinksByUserId(authUser);

    return userLinks;
  }
}
