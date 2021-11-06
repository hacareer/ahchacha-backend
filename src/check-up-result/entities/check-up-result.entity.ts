import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {User} from 'src/user/entities/user.entity';
import {Clinic} from 'src/clinic/entities/clinic.entity';

@Entity('check-up-result')
export class CheckUpResult {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  startTime: Date;

  @Column()
  finishTime: Date;

  /* Relations */

  @ManyToOne(() => User, (user) => user.checkUpResultList)
  user!: User;

  @ManyToOne(() => Clinic, (clinic) => clinic.checkUpResultList)
  clinic!: Clinic;

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
