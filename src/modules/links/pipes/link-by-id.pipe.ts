import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  NotFoundException,
} from '@nestjs/common';
import { LinksService } from '../providers/links.service';
import { Link } from '../entities/link.entity';

@Injectable()
export class LinkByIdPipe implements PipeTransform {
  constructor(private readonly linkService: LinksService) {}

  async transform(value: any, metadata: ArgumentMetadata): Promise<Link> {
    const link: Link = await this.linkService.findOne(value);

    if (!link.id) throw new NotFoundException('Link with this id not Found!');

    return link;
  }
}
