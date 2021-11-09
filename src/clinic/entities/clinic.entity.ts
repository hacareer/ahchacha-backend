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
import {OperationHour} from './operation-hour.entity';
import {Label} from '../../constants';
import {ClinicComment} from './../../clinic-comment/entities/clinic-comment.entity';
import {CheckUp} from './../../check-up/entities/check-up.entity';

@Entity('clinic')
export class Clinic {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: Label,
    nullable: true,
  })
  label: Label;

  @Column()
  address: string;

  @Column({type: 'decimal', precision: 7, scale: 5, default: 0})
  latitude: number;

  @Column({type: 'decimal', precision: 9, scale: 6, default: 0})
  longitude: number;

  @Column()
  telephone: string;

  /* Relations */

  @OneToMany(() => ClinicComment, (clinicComment) => clinicComment.clinic)
  clinicCommentList: ClinicComment[];

  @OneToMany(() => CheckUp, (checkUp) => checkUp.clinic)
  checkUpList: CheckUp[];

  @JoinColumn()
  @OneToOne(() => OperationHour, (operationHour) => operationHour.clinic)
  operationHour!: OperationHour;

  /* Date Columns */

  @CreateDateColumn({select: false})
  createdAt: Date;

  @UpdateDateColumn({select: false})
  updatedAt: Date;

  @DeleteDateColumn({select: false})
  deletedAt: Date | null;
}
