import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {User} from '../../user/entities/user.entity';

@Entity('location')
export class Location {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  address: string;

  @Column({type: 'decimal', precision: 13, scale: 8, default: 0})
  latitude: number;

  @Column({type: 'decimal', precision: 13, scale: 8, default: 0})
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
