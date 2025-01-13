import { Body, Controller, Post } from '@nestjs/common';
import { LinkService } from './providers/links.service';
import { CrateLinkDto } from './dtos/create-link.dto';
import { LinkInterface } from './interfaces/link.interface';
@Controller('api/link-shortening')
export class LinkController {
  constructor(private LinkService: LinkService) {}

  @Post('')
  public create(@Body() crateLinkDto: CrateLinkDto): Promise<LinkInterface> {
    return this.LinkService.getNewLink(crateLinkDto);
  }
}
