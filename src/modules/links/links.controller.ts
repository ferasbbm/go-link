import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpStatus,
  HttpCode,
  Delete,
  Patch,
} from '@nestjs/common';
import { LinksService } from './providers/links.service';
import { CreateLinkDto } from './dtos/create-link.dto';
import { LinkInterface } from './interfaces/link.interface';
import { UpdateLinkDto } from './dtos/update-link.dto';
@Controller('api/link-shortening')
export class LinksController {
  constructor(private LinkService: LinksService) {}

  @Post()
  create(@Body() crateLinkDto: CreateLinkDto): Promise<LinkInterface> {
    return this.LinkService.generateNewLink(crateLinkDto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number): Promise<LinkInterface> {
    const link = this.LinkService.getLinkById(id);
    return link;
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateLinkDto: UpdateLinkDto,
  ): Promise<LinkInterface> {
    return this.LinkService.update(id, updateLinkDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.LinkService.delete(id);
  }
}
