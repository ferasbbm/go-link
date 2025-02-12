import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { TokenPayload } from 'src/common/types/global.type';
import { UsersService } from 'src/modules/users/providers/users.service';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'), // Extract from body, field name 'refreshToken'
      secretOrKey: configService.get('JWT_REFRESH_SECRET'),
      passReqToCallback: true, // Pass request to callback to access refreshToken from body
    });
  }

  async validate(req: Request, payload: TokenPayload) {
    const refreshToken = req.body.refreshToken; // Extract refreshToken from body
    return { ...payload, refreshToken }; // Attach refreshToken to the user object
  }
}
