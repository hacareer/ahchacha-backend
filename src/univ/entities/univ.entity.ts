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
import {ApiProperty} from '@nestjs/swagger';
import {User} from 'src/user/entities/user.entity';
import {UnivComment} from 'src/univ-comment/entities/univ-comment.entity';

@Entity('univ')
export class Univ {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({description: '대학 id'})
  id: number;

  @Column()
  name: string;

  /* Relations */

  @OneToMany(() => User, (user) => user.univ)
  userList: User[];

  @OneToMany(() => UnivComment, (univComment) => univComment.univ)
  univCommentList: UnivComment[];

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
