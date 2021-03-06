import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {User} from './../../user/entities/user.entity';
import {UnivComment} from './../../univ-comment/entities/univ-comment.entity';

@Entity('univ')
export class Univ {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  /* Relations */

  @OneToMany(() => User, (user) => user.univ)
  userList: User[];

  @OneToMany(() => UnivComment, (univComment) => univComment.univ)
  univCommentList: UnivComment[];

  /* Date Columns */

  @CreateDateColumn({select: false})
  createdAt: Date;

  @UpdateDateColumn({select: false})
  updatedAt: Date;

  @DeleteDateColumn({select: false})
  deletedAt: Date | null;
}
