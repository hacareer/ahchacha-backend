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

@Entity('check-up')
export class CheckUp {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'timestamp',
  })
  date: Date;

  /* Relations */

  @ManyToOne(() => User, (user) => user.checkUpList)
  user: User;

  @ManyToOne(() => Clinic, (clinic) => clinic.checkUpList)
  clinic: Clinic;

  /* Date Columns */

  @CreateDateColumn({select: false})
  createdAt: Date;

  @UpdateDateColumn({select: false})
  updatedAt: Date;

  @DeleteDateColumn({select: false})
  deletedAt: Date | null;
}
