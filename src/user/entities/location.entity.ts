import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';

@Entity('location')
export class Location {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({ description: '위치 id' })
  id: number;

  @Column()
  address: string;

  @Column()
  latitude: Float32Array;

  @Column()
  longitude: Float32Array;

  /* Relations */

  @OneToOne(() => User, (user) => user.location)
  user!: User;

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
