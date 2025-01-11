import { Module } from '@nestjs/common';
import { LinkShorteningController } from './link-shortening.controller';
import { LinkShorteningService } from './providers/link-shortening.service';

@Module({
  controllers: [LinkShorteningController],
  providers: [LinkShorteningService],
})
export class linkShorteningModule {}
