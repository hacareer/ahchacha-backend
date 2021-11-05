import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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
  @ApiProperty({description: '위치 id'})
  id: number;

  @Column()
  address: string;

  @Column({type: 'decimal', precision: 7, scale: 5, default: 0})
  latitude: number;

  @Column({type: 'decimal', precision: 9, scale: 6, default: 0})
  longitude: number;

  /* Relations */

  @ManyToOne(() => User, (user) => user.locationList)
  user!: User;

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
