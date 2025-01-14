import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { LinkService } from './providers/links.service';
import { CrateLinkDto } from './dtos/create-link.dto';
import { LinkInterface } from './interfaces/link.interface';
@Controller('api/link-shortening')
export class LinkController {
  constructor(private LinkService: LinkService) {}

  @Post('')
  create(@Body() crateLinkDto: CrateLinkDto): Promise<LinkInterface> {
    return this.LinkService.getNewLink(crateLinkDto);
  }

  @Get(':id')
  show(@Param('id', new ParseIntPipe()) id: number) {
    const link = this.LinkService.findOne(id);
    return link;
  }
}
