import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {User} from './../../user/entities/user.entity';

@Entity('check-up-result')
export class CheckUpResult {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'timestamp',
  })
  startTime: Date;

  @Column({
    type: 'timestamp',
  })
  finishTime: Date;

  /* Relations */

  @ManyToOne(() => User, (user) => user.checkUpResultList)
  user!: User;

  /* Date Columns */

  @CreateDateColumn({select: false})
  createdAt: Date;

  @UpdateDateColumn({select: false})
  updatedAt: Date;

  @DeleteDateColumn({select: false})
  deletedAt: Date | null;
}
