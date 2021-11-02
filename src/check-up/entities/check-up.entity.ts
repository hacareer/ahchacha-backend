import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { Result } from '../../constants';

@Entity('check-up')
export class CheckUp {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({ description: '검사기록 id' })
  id: number;

  @Column()
  startTime: Date;

  @Column()
  finishTime: Date;

  @Column({
    type: 'enum',
    enum: Result,
    nullable: true,
  })
  result: Result;

  /* Relations */

  @ManyToOne(() => User, (user) => user.checkUpList)
  user!: User;

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
