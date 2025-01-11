import { Module } from '@nestjs/common';
import { linkShorteningModule } from './link-shortening.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [linkShorteningModule, AuthModule],
})
export class AppModule {}
