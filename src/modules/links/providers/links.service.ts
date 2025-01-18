import { LinkInterface } from './../interfaces/link.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Link } from '../entities/link.entity';
import { Repository } from 'typeorm';
import { CreateLinkDto } from '../dtos/create-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkTransformer } from '../transformers/link.transformer';
import { generateShortUrl } from '../utils/short-url.generator';
import { UpdateLinkDto } from '../dtos/update-link.dto';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link) private readonly linkRepo: Repository<Link>,
  ) {}

  /**
   * Fun for generate new link
   * @param dto
   * @returns Link obj from db
   */
  async generateNewLink(dto: CreateLinkDto): Promise<LinkInterface> {
    const shortUrlFragment = await generateShortUrl();
    const createdLink = this.linkRepo.create({
      ...dto,
      shortUrl: shortUrlFragment,
    });
    const link = await this.linkRepo.save(createdLink);

    return LinkTransformer.make(link);
  }

  /**
   * This fun for get link from db using id
   * @param id
   * @returns  Link obj
   */
  async findOne(id: number): Promise<LinkInterface> {
    const link = await this.linkRepo.findOne({ where: { id } });
    if (!link) throw new NotFoundException();

    return LinkTransformer.make(link);
  }

  /**
   *
   * @param id of link
   * @param dto  link params
   * @returns updated link from db
   */
  async update(id: number, dto: UpdateLinkDto): Promise<LinkInterface> {
    const link = await this.findOne(id);

    Object.assign(link, dto);
    const updatedLink = await this.linkRepo.save(link);

    return LinkTransformer.make(updatedLink);
  }
}
