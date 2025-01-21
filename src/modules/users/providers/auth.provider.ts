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
import { checkHash, makeHash } from '../utils/hash.util';
import { generateToken } from '../utils/jwt.util';
import { UserTransformer } from '../transformers/user.transformer';
import { UserInterface } from '../interfaces/user.interface';

@Injectable({})
export class AuthProvider {
  constructor(
    private jwtService: JwtService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async signup(registerDto: RegisterDto): Promise<UserInterface> {
    const hashedPassword: string = await makeHash(registerDto.password);

    const userObj: User = this.userRepo.create({
      ...registerDto,
      hashedPassword,
    });
    const user: User = await this.userRepo.save(userObj);

    const token: string = await generateToken(this.jwtService, {
      userId: user.id,
      username: user.username,
    });

    return UserTransformer.make(user, token);
  }

  async signin(username: string, pass: string): Promise<UserInterface> {
    const user = await this.usersService.findByIdentifier(username);

    const isPasswordValid = await checkHash(pass, user.hashedPassword);

    if (!isPasswordValid)
      throw new UnauthorizedException('password not correct!');

    const token: string = await generateToken(this.jwtService, {
      userId: user.id,
      username: user.username,
    });

    return UserTransformer.make(user, token);
  }
}
