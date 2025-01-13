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

  @Column({ nullable: true })
  customUrl: string;

  @Column({ nullable: true })
  shortUrl: string;

  @Column()
  hashedPassword: string;

  @Column()
  clicksCount: number;

  @Column()
  maxClicks: number;

  @Column('timestamp')
  expirationDate: Date;

  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
