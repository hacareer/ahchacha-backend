import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {User} from 'src/user/entities/user.entity';
import {Clinic} from 'src/clinic/entities/clinic.entity';

@Entity('check-up')
export class CheckUp {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({description: '검사기록 id'})
  id: number;

  @Column()
  startTime: Date;

  @Column()
  finishTime: Date;

  /* Relations */

  @ManyToOne(() => User, (user) => user.checkUpList)
  user!: User;

  @ManyToOne(() => Clinic, (clinic) => clinic.checkUpList)
  clinic!: Clinic;

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
