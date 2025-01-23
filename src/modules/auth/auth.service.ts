import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/providers/users.service';
import { UserInterface } from '../users/interfaces/user.interface';
import { User } from '../users/entities/user.entity';
import { checkHash, makeHash } from './utils/hash.util';
import { generateToken } from './utils/jwt.util';
import { UserTransformer } from '../users/transformers/user.transformer';
import { RegisterDto } from './dtos/register.dto';

@Injectable({})
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(registerDto: RegisterDto): Promise<UserInterface> {
    const hashedPassword: string = await makeHash(registerDto.password);

    const user = await this.usersService.create({
      ...registerDto,
      hashedPassword,
    });

    const token: string = await generateToken(this.jwtService, {
      userId: user.id,
      username: user.username,
    });

    return UserTransformer.make(user, token);
  }

  async login(username: string, pass: string): Promise<UserInterface> {
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
