import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './users.controller';
import { UsersService } from './providers/users.service';
import { LinksModule } from '../links/links.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LinksModule],
  controllers: [UserController],
  providers: [UsersService],
  exports: [],
})
export class UserModule {}
