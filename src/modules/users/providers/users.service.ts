import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { identifyType } from '../../auth/utils/identifier.util';
import { IdentifyType } from 'src/common/enums/app.enums';

@Injectable({})
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  // async getMyLinks(userId: number) {
  //   const authUser: User = await this.userRepo.findOneBy({ id: userId });
  //   const userLinks = await this.linkService.getLinksByUserId(authUser);

  //   return userLinks;
  // }

  async create(data: object): Promise<User> {
    const userObj: User = this.userRepo.create(data);
    const user: User = await this.userRepo.save(userObj);

    return user;
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

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<User> {
    const user: User = await this.userRepo.findOneBy({ id: userId });
    user.refreshToken = refreshToken;

    return this.userRepo.save(user);
  }
}
