import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { OperationHour } from './operation-hour.entity';
import { Label } from '../../constants';
import { CheckUp } from 'src/check-up/entities/check-up.entity';
import { ClinicComment } from 'src/clinic-comment/entities/clinic-comment.entity';

@Entity('clinic')
export class Clinic {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({ description: '선별진료소 id' })
  id: number;

  @Column({
    type: 'enum',
    enum: Label,
    nullable: true,
  })
  label: Label;

  @Column()
  address: string;

  @Column({ type: 'decimal', precision: 7, scale: 5, default: 0 })
  latitude: number;

  @Column({ type: 'decimal', precision: 9, scale: 6, default: 0 })
  longitude: number;

  @Column()
  telephone: string;

  /* Relations */

  @OneToMany(() => CheckUp, (checkUp) => checkUp.clinic)
  checkUpList: CheckUp[];

  @OneToMany(() => ClinicComment, (clinicComment) => clinicComment.clinic)
  clinicCommentList: ClinicComment[];

  @JoinColumn()
  @OneToOne(() => OperationHour, (operationHour) => operationHour.clinic)
  operationHour!: OperationHour;

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
