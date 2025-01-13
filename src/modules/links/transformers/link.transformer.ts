import { Link } from '../entities/link.entity';
import { LinkInterface } from '../interfaces/link.interface';

export class LinkTransformer {
  static make(link: Link): LinkInterface {
    return {
      id: link.id,
      originalUrl: link.originalUrl,
      shortUrl: link.shortUrl,
      customUrl: link.customUrl,
      clicksCount: link.clicksCount,
      userId: link.userId,
    };
  }
  static collection(links: Link[]): LinkInterface[] {
    return links.map((link) => this.make(link));
  }
}
