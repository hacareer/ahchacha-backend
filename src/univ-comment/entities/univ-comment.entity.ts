import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {Univ} from './../../univ/entities/univ.entity';
import {User} from './../../user/entities/user.entity';

export enum UnivCommentTag {
  '백신미접종자 차별 화나요' = 'T1',
  '저는 이제 백신 다 맞았어요' = 'T2',
  '백신 아직 불안해요' = 'T3',
  '마스크 불편해요' = 'T4',
  '대면 수업 힘들어요' = 'T5',
}

@Entity('univ-comment')
export class UnivComment {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'enum',
    enum: UnivCommentTag,
    nullable: true,
  })
  content: UnivCommentTag;

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
