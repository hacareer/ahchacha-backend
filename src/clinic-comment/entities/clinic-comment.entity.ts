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
import {ClinicCommentTag} from '../../constants';

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
