import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('links')
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  originalUrl: string;

  @Column()
  customUrl: string;

  @Column()
  shortUrl: string;

  @Column()
  hashedPassword: string;

  @Column('number')
  clickCount: number;

  @Column('number')
  maxClicks: number;

  @Column('timestamp')
  expirationDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
