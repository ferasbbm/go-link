import { Module } from '@nestjs/common';
import { linkShorteningModule } from './links/links.module';

@Module({
  imports: [linkShorteningModule],
})
export class AppModule {}
