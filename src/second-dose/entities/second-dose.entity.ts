import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {User} from 'src/user/entities/user.entity';

@Entity('second-dose')
export class SecondDose {
  @PrimaryGeneratedColumn('increment')
  id: number;

  /* Relations */
  @JoinColumn()
  @OneToOne(() => User, (user) => user.secondDose)
  user!: User;

  /* Date Columns */

  @CreateDateColumn({select: false})
  createdAt: Date;

  @UpdateDateColumn({select: false})
  updatedAt: Date;

  @DeleteDateColumn({select: false})
  deletedAt: Date | null;
}
