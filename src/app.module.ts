import { Module } from '@nestjs/common';
import { linkShorteningModule } from './link-shortening/link-shortening.module';

@Module({
  imports: [linkShorteningModule],
})
export class AppModule {}
