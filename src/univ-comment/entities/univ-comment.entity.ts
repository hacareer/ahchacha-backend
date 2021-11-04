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
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { Univ } from 'src/univ/entities/univ.entity';

@Entity('univComment')
export class UnivComment {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({ description: '후기 id' })
  id: number;

  // TODO 후기 tag 추가

  /* Relations */

  @ManyToOne(() => Univ, (univ) => univ.univCommentList)
  univ: Univ;

  @ManyToOne(() => User, (user) => user.univCommentList)
  user: User;

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
