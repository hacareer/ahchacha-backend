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

  @Column({nullable: true})
  weekdayOpen: string;

  @Column({nullable: true})
  weekdayClose: string;

  @Column({nullable: true})
  saturdayOpen: string;

  @Column({nullable: true})
  saturdayClose: string;

  @Column({nullable: true})
  sundayOpen: string;

  @Column({nullable: true})
  sundayClose: string;

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
