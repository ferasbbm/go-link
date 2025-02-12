import { TokenPayload } from 'src/common/types/global.type';
import { JwtService } from '@nestjs/jwt';

export const generateAccessToken = async (
  jwtService: JwtService,
  payload: TokenPayload,
): Promise<string> => jwtService.signAsync(payload);

export const verifyToken = async (
  jwtService: JwtService,
  token: string,
): Promise<TokenPayload> => {
  const payload: TokenPayload = await jwtService.verifyAsync(token, {
    secret: process.env.JWT_SECRET,
  });
  return payload;
};
