import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { LinksService } from './providers/links.service';
import { CreateLinkDto } from './dtos/create-link.dto';
import { LinkInterface } from './interfaces/link.interface';
import { UpdateLinkDto } from './dtos/update-link.dto';
@Controller('api/link-shortening')
export class LinksController {
  constructor(private LinkService: LinksService) {}

  @Post('')
  create(@Body() crateLinkDto: CreateLinkDto): Promise<LinkInterface> {
    return this.LinkService.getNewLink(crateLinkDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  show(@Param('id') id: number) {
    const link = this.LinkService.findOne(id);
    return link;
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateLinkDto: UpdateLinkDto) {
    return this.LinkService.update(id, updateLinkDto);
  }
}
