import { Module } from '@nestjs/common';
import { linkShorteningModule } from './link-shortening.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [linkShorteningModule, AuthModule, UsersModule],
})
export class AppModule {}
