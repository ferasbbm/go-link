import { Body, Controller, Post } from '@nestjs/common';
import { LinkService } from './providers/links.service';
@Controller('api/link-shortening')
export class LinkController {
  constructor(private LinkService: LinkService) {}

  @Post('')
  public create(@Body('originalURL') originalURL: string): string {
    return this.LinkService.getNewLink(originalURL);
  }
}
