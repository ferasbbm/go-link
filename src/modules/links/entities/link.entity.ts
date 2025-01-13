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
  originalURL: string;

  @Column({ nullable: true })
  customUrl: string;

  @Column({ nullable: true })
  shortUrl: string;

  @Column({ nullable: true })
  hashedPassword: string;

  @Column({ default: 0 })
  clicksCount: number;

  @Column({ default: 0 })
  maxClicks: number;

  @Column('timestamp', { nullable: true })
  expirationDate: Date;

  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
