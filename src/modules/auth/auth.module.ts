import { Module } from '@nestjs/common';
import { jwtConfig } from 'src/config/jwt.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/users.module';

@Module({
  imports: [UserModule, jwtConfig()],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [],
})
export class AuthModule {}
