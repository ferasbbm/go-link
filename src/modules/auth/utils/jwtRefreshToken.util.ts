import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from 'src/common/types/global.type';

export const generateRefreshToken = async (
  jwtService: JwtService,
  payload: TokenPayload,
): Promise<string> =>
  jwtService.sign(payload, {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });

export const verifyRefreshToken = async (
  jwtService: JwtService,
  token: string,
): Promise<TokenPayload> => {
  return jwtService.verify(token, {
    secret: process.env.JWT_REFRESH_SECRET,
  });
};
