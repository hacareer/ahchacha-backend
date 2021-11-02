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
import { Clinic } from 'src/clinic/entities/clinic.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({ description: '후기 id' })
  id: number;

  // TODO 후기 tag 추가

  /* Relations */

  @ManyToOne(() => Clinic, (clinic) => clinic.commentList)
  clinic: Clinic;

  @ManyToOne(() => User, (user) => user.commentList)
  user: User;

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
