import { Link } from 'src/modules/links/entities/link.entity';

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  username: string;
  mobile: string;
  createdAt: Date;
  accessToken?: string;
  links: Link[];
}
