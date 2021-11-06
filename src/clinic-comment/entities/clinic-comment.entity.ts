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
import {Clinic} from 'src/clinic/entities/clinic.entity';
import {User} from 'src/user/entities/user.entity';

@Entity('clinicComment')
export class ClinicComment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  content: string;

  /* Relations */

  @ManyToOne(() => Clinic, (clinic) => clinic.clinicCommentList)
  clinic: Clinic;

  @ManyToOne(() => User, (user) => user.clinicCommentList)
  user: User;

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
