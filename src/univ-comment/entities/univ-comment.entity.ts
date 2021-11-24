import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {UnivTag} from '../../constants';
import {Univ} from './../../univ/entities/univ.entity';
import {User} from './../../user/entities/user.entity';

@Entity('univ-comment')
export class UnivComment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'enum',
    enum: UnivTag,
    nullable: true,
  })
  content: UnivTag;

  /* Relations */

  @ManyToOne(() => Univ, (univ) => univ.univCommentList)
  univ: Univ;

  @ManyToOne(() => User, (user) => user.univCommentList)
  user: User;

  /* Date Columns */

  @CreateDateColumn({select: false})
  createdAt: Date;

  @UpdateDateColumn({select: false})
  updatedAt: Date;

  @DeleteDateColumn({select: false})
  deletedAt: Date | null;
}
