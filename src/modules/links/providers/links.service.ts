import { Injectable } from '@nestjs/common';

@Injectable()
export class LinkService {
  getNewLink(link: string): string {
    return link;
  }
}
