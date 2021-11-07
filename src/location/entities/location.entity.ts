import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {User} from '../../user/entities/user.entity';

@Entity('location')
export class Location {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  address: string;

  @Column({type: 'decimal', precision: 7, scale: 5, default: 0})
  latitude: number;

  @Column({type: 'decimal', precision: 9, scale: 6, default: 0})
  longitude: number;

  /* Relations */

  @OneToOne(() => User, (user) => user.location)
  user!: User;

  /* Date Columns */

  @CreateDateColumn({select: false})
  createdAt: Date;

  @UpdateDateColumn({select: false})
  updatedAt: Date;

  @DeleteDateColumn({select: false})
  deletedAt: Date | null;
}
