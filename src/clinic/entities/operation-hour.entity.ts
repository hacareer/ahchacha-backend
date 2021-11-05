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
import {Clinic} from './clinic.entity';

@Entity('operation-hour')
export class OperationHour {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({description: '운영시간 id'})
  id: number;

  @Column()
  weekdayOpen: Date;

  @Column()
  weekdayClose: Date;

  @Column()
  saturdayOpen: Date;

  @Column()
  saturdayClose: Date;

  @Column()
  sundayOpen: Date;

  @Column()
  sundayClose: Date;

  /* Relations */

  @OneToOne(() => Clinic, (clinic) => clinic.operationHour)
  clinic!: Clinic;

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
