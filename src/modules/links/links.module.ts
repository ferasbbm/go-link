import { Module } from '@nestjs/common';
import { LinkShorteningController } from './links.controller';
import { LinkShorteningService } from './providers/links.service';

@Module({
  controllers: [LinkShorteningController],
  providers: [LinkShorteningService],
})
export class linkShorteningModule {}
