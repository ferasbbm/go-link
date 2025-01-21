import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './users.controller';
import { UsersService } from './providers/users.service';
import { LinksModule } from '../links/links.module';
import { AuthProvider } from './providers/auth.provider';
import { jwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LinksModule, jwtConfig()],
  controllers: [UserController],
  providers: [UsersService, AuthProvider],
  exports: [],
})
export class UserModule {}
