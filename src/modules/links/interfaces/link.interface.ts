import { User } from 'src/modules/users/entities/user.entity';

export interface LinkInterface {
  id: number;
  originalUrl: string;
  shortUrl: string;
  customUrl?: string;
  expirationDate?: Date;
  clicksCount: number;
  userId?: User;
}
