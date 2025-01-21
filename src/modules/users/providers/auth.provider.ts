import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { RegisterDto } from '../dtos/register.dto';
import { makeHash } from '../utils/hash.generate';
import { generateToken } from '../utils/jwt.helper';

@Injectable({})
export class AuthProvider {
  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => UsersService)) // Use forwardRef here
    private readonly usersService: UsersService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async signup(registerDto: RegisterDto) {
    const hashedPassword: string = await makeHash(registerDto.password);

    const user: User = this.userRepo.create({ ...registerDto, hashedPassword });
    const createdUser = await this.userRepo.save(user);

    const token = await generateToken(this.jwtService, {
      userId: user.id,
      username: user.username,
    });
    return token;
  }

  async signin(username: string, pass: string) {
    // const user = await this.usersService.findOne(username);
    if (pass !== 'pass') throw new UnauthorizedException();

    const payload = { sub: 1, username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
