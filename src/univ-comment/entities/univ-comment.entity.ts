import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {User} from 'src/user/entities/user.entity';
import {Univ} from 'src/univ/entities/univ.entity';
import {UnivTag} from 'src/constants';

@Entity('univComment')
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
