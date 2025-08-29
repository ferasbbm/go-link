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
  UseGuards,
  Req,
} from '@nestjs/common';
import { LinksService } from './providers/links.service';
import { CreateLinkDto } from './dtos/create-link.dto';
import { LinkInterface } from './interfaces/link.interface';
import { UpdateLinkDto } from './dtos/update-link.dto';
import { LinkByIdPipe } from './pipes/link-by-id.pipe';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse } from 'src/common/utils/api-response.util';
import { IApiResponse } from 'src/common/interfaces/api-response.interface';
import { Link } from './entities/link.entity';
import { LinkTransformer } from './transformers/link.transformer';
@Controller('link-shortening')
export class LinksController {
  constructor(private readonly LinkService: LinksService) {}

  /**
   *  TODO:
   * - check if generated link is exist in DB, if auth user add custom url we can add the name of user then dot then custom url to avoid duplication
   *  TODO:
   * - Generate QR code with link and make EP for download and share QR code
   *  TODO:
   * - add cookie for user or  session to save user  links
   * Create short link
   * @param crateLinkDto
   * @returns created link from DB
   *  */
  @Post()
  async create(
    @Body() crateLinkDto: CreateLinkDto,
  ): Promise<IApiResponse<LinkInterface>> {
    const link: LinkInterface =
      await this.LinkService.generateNewLink(crateLinkDto);

    return ApiResponse.success<LinkInterface>(
      link,
      `Link shorted successfully !`,
      HttpStatus.CREATED,
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async findOne(
    @Param('id', LinkByIdPipe) link: Link,
  ): Promise<IApiResponse<LinkInterface>> {
    return ApiResponse.success(
      LinkTransformer.make(link),
      'Link found successfully!',
    );
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id', LinkByIdPipe) link: Link,
    @Body() updateLinkDto: UpdateLinkDto,
  ): Promise<IApiResponse<LinkInterface>> {
    const updatedLink: LinkInterface = await this.LinkService.update(
      link,
      updateLinkDto,
    );

    return ApiResponse.success(
      updatedLink,
      'Link update successfully!',
      HttpStatus.OK,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard('jwt'))
  async delete(
    @Param('id', LinkByIdPipe) link: Link,
  ): Promise<IApiResponse<any>> {
    this.LinkService.delete(link);

    return ApiResponse.success(
      null,
      'Link deleted successfully!',
      HttpStatus.NO_CONTENT,
    );
  }

  /**
   * list links that belong to auth user
   * @param req
   * @returns a list of user links
   */
  @Get('my-link')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async listMyLinks(@Req() req: any): Promise<IApiResponse<LinkInterface[]>> {
    const links: LinkInterface[] = await this.LinkService.getLinksByUserId(
      req.user,
    );

    return ApiResponse.success(links, 'User links retrieved successfully');
  }
}
