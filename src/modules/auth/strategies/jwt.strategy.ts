import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from 'src/common/types/global.type';
import { User } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/providers/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }
  async validate(payload: TokenPayload): Promise<User> {
    const authUser: User = await this.userService.findByIdentifier(
      payload.username,
    );

    if (!authUser) throw new UnauthorizedException('user not found!');

    return authUser;
  }
}
