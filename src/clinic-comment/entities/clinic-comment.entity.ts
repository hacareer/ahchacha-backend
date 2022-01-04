import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {Clinic} from './../../clinic/entities/clinic.entity';
import {User} from './../../user/entities/user.entity';

export enum ClinicCommentTag {
  '검사가 빨리 끝나요' = 'T1',
  '교통이 불편해요' = 'T2',
  '늦게까지 해요' = 'T3',
  '근처에 주차공간이 있어요' = 'T4',
  '검사자수가 많아요' = 'T5',
}

@Entity('clinic-comment')
export class ClinicComment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'enum',
    enum: ClinicCommentTag,
    nullable: true,
  })
  content: ClinicCommentTag;

  /* Relations */

  @ManyToOne(() => Clinic, (clinic) => clinic.clinicCommentList)
  clinic: Clinic;

  @ManyToOne(() => User, (user) => user.clinicCommentList)
  user: User;

  /* Date Columns */

  @CreateDateColumn({select: false})
  createdAt: Date;

  @UpdateDateColumn({select: false})
  updatedAt: Date;

  @DeleteDateColumn({select: false})
  deletedAt: Date | null;
}
