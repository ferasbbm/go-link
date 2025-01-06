import { Body, Controller, Post } from '@nestjs/common';
import { LinkShorteningService } from './link-shortening.service';
@Controller('api/link-shortening')
export class LinkShorteningController {
  constructor(private LinkShorteningService: LinkShorteningService) {}

  @Post('')
  public create(@Body('link') link: string): string {
    return this.LinkShorteningService.getNewLink(link);
  }
}
