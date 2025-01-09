import { Injectable } from '@nestjs/common';

@Injectable()
export class LinkShorteningService {
  getNewLink(link: string): string {
    return link;
  }
}
