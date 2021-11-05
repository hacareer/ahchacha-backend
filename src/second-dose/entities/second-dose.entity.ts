import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {User} from 'src/user/entities/user.entity';

@Entity('second-dose')
export class SecondDose {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({description: '2차 접종 id'})
  id: number;

  /* Relations */

  @OneToOne(() => User, (user) => user.secondDose)
  user!: User;

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
