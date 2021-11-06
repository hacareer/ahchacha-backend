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

@Entity('checkUp')
export class CheckUp {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  day: Date;

  /* Relations */

  @ManyToOne(() => User, (user) => user.checkUpList)
  user: User;

  @ManyToOne(() => Clinic, (clinic) => clinic.checkUpList)
  clinic: Clinic;

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
