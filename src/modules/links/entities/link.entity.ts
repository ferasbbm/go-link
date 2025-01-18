import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
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

  @ManyToOne(() => User, (user) => user.links)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
