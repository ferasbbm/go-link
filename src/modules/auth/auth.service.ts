import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/providers/users.service';
import { UserInterface } from '../users/interfaces/user.interface';
import { checkHash, makeHash } from './utils/hash.util';
import { generateAccessToken } from './utils/jwt.util';
import { UserTransformer } from '../users/transformers/user.transformer';
import { RegisterDto } from './dtos/register.dto';
import { User } from '../users/entities/user.entity';
import { generateRefreshToken } from './utils/jwtRefreshToken.util';
import * as jwt from 'jsonwebtoken';
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

    const tokens: any = await this.generateTokens(user);
    await this.usersService.updateRefreshToken(user.id, tokens['refreshToken']);

    return UserTransformer.make(user, ...tokens);
  }

  async login(username: string, pass: string): Promise<UserInterface> {
    const user = await this.usersService.findByIdentifier(username);

    const isPasswordValid: boolean = await checkHash(pass, user.hashedPassword);

    if (!isPasswordValid)
      throw new UnauthorizedException('password not correct!');

    const tokens: any = await this.generateTokens(user);
    await this.usersService.updateRefreshToken(user.id, tokens['refreshToken']);

    return UserTransformer.make(user, ...tokens);
  }

  async logout(user: User): Promise<void> {
    this.usersService.updateRefreshToken(user.id, null);
  }

  async getAccessToken(user: User, refreshToken: string): Promise<string> {
    if (user.refreshToken != refreshToken)
      throw new UnauthorizedException('Refresh token wrong!');

    const payload = { userId: user.id, username: user.username };

    return generateAccessToken(this.jwtService, payload);
  }

  private async generateTokens(user: User): Promise<[string, string]> {
    const payload = { userId: user.id, username: user.username };

    return Promise.all([
      generateAccessToken(this.jwtService, payload),
      generateRefreshToken(this.jwtService, payload),
    ]);
  }

  // clcTokenExp() {
  //   const token =
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyLCJ1c2VybmFtZSI6ImZlcmFzYmJtIiwiaWF0IjoxNzM4OTUxODYzLCJleHAiOjE3Mzg5NTE5MjN9.EPBrLKxwpjxZtuUB-7-eeBA5wDIGsBfxF1eU9_iTT14';
  //   const rToken =
  //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQxLCJ1c2VybmFtZSI6ImZlcmFzYmJtIiwiaWF0IjoxNzM4OTA3NDYxLCJleHAiOjE3Mzg5MTQ2NjF9.7Lwt56ALdbfaZT9HaL-0F9Exee5ZZbaId1JPR8blZpI';
  //   const decode = jwt.decode(token);
  //   return (decode['exp'] - Math.floor(Date.now() / 1000)) / 60;
  // }
}
