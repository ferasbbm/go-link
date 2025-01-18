import { LinkInterface } from './../interfaces/link.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Link } from '../entities/link.entity';
import { Repository } from 'typeorm';
import { CreateLinkDto } from '../dtos/create-link.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LinkTransformer } from '../transformers/link.transformer';
import { generateShortUrl } from '../utils/short-url.generator';
import { UpdateLinkDto } from '../dtos/update-link.dto';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(Link) private readonly linkRepo: Repository<Link>,
  ) {}

  /**
   * Generates a new short link and saves it to the database.
   * @param dto - Data Transfer Object for creating a link.
   * @returns The created link as a LinkInterface.
   */
  async generateNewLink(dto: CreateLinkDto): Promise<LinkInterface> {
    const shortUrl = await generateShortUrl();
    const link = this.linkRepo.create({ ...dto, shortUrl });
    const savedLink = await this.linkRepo.save(link);

    return LinkTransformer.make(savedLink);
  }

  /**
   * Retrieves a link by its ID.
   * @param id - The ID of the link to retrieve.
   * @returns The link as a LinkInterface.
   * @throws NotFoundException if the link is not found.
   */
  async getLinkById(id: number): Promise<LinkInterface> {
    const link = await this.findOne(id);

    return LinkTransformer.make(link);
  }

  /**
   * Updates a link by its ID.
   * @param id - The ID of the link to update.
   * @param dto - Data Transfer Object for updating a link.
   * @returns The updated link as a LinkInterface.
   * @throws NotFoundException if the link is not found.
   */
  async update(id: number, dto: UpdateLinkDto): Promise<LinkInterface> {
    const link = await this.findOne(id);
    Object.assign(link, dto);
    const updatedLink = await this.linkRepo.save(link);

    return LinkTransformer.make(updatedLink);
  }

  /**
   * Deletes a link by its ID.
   * @param id - The ID of the link to delete.
   * @throws NotFoundException if the link is not found.
   */
  async delete(id: number): Promise<void> {
    const link = await this.findOne(id);
    await this.linkRepo.remove(link);
  }

  /**
   * Retrieves a link by user id.
   * @param user - The ID of the user to retrieve links.
   * @returns The link as array of LinkInterface.
   */
  async getLinksByUserId(user: User): Promise<LinkInterface[]> {
    const links: Link[] = await this.linkRepo.find({ where: { user } });

    return LinkTransformer.collection(links);
  }

  /**
   * Internal method to find a link by its ID.
   * @param id - The ID of the link to find.
   * @returns The Link entity.
   * @throws NotFoundException if the link is not found.
   */
  private async findOne(id: number): Promise<Link> {
    const link = await this.linkRepo.findOne({ where: { id } });
    if (!link) throw new NotFoundException('Link not found');

    return link;
  }
}
