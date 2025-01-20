import { Link } from 'src/modules/links/entities/link.entity';
import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
  Unique,
} from 'typeorm';

@Entity('users')
@Unique(['username', 'email', 'mobile'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  username: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  mobile: string;

  @Column()
  hashedPassword: string;

  @OneToMany(() => Link, (link) => link.user)
  @JoinColumn()
  links: Link[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
