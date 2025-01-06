import { Module } from '@nestjs/common';
import { LinkShorteningController } from './link-shortening.controller';
import { LinkShorteningService } from './link-shortening.service';

@Module({
  controllers: [LinkShorteningController],
  providers: [LinkShorteningService],
})
export class linkShorteningModule {}
