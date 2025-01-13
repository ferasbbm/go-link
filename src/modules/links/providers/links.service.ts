import { LinkInterface } from './../interfaces/link.interface';
import { Injectable } from '@nestjs/common';
import { Link } from '../entities/link.entity';
import { Repository } from 'typeorm';
import { CrateLinkDto } from '../dtos/create-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkTransformer } from '../transformers/link.transformer';

@Injectable()
export class LinkService {
  constructor(
    private readonly linkInterface: LinkInterface,
    // private linkTransformer: LinkTransformer,
    @InjectRepository(Link) private readonly linkRepo: Repository<Link>,
  ) {}

  /**
   * This fun for generate new link
   * @param dto
   * @returns
   */
  async getNewLink(dto: CrateLinkDto): Promise<LinkInterface> {
    const createdLink = this.linkRepo.create(dto);
    const link = await this.linkRepo.save(createdLink);

    return LinkTransformer.make(link);
  }
}
