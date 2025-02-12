import { Module } from '@nestjs/common';
import { jwtConfig } from 'src/config/jwt.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshTokenStrategy } from './strategies/refresh-jwt.strategy';

@Module({
  imports: [UserModule, jwtConfig()],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtRefreshTokenStrategy],
  exports: [],
})
export class AuthModule {}
