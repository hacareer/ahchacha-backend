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
import { ApiProperty } from '@nestjs/swagger';
import { Vaccination } from '../../constants';
import { CheckUp } from 'src/check-up/entities/check-up.entity';
import { SecondDose } from 'src/second-dose/entities/second-dose.entity';
import { Univ } from './../../univ/entities/univ.entity';
import { Location } from './location.entity';
import { Comment } from 'src/comment/entities/comment.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({ description: '사용자 id' })
  id: number;

  @Column()
  nickname: string;

  @Column()
  kakaoAccount: string;

  @Column({
    type: 'enum',
    enum: Vaccination,
    nullable: true,
  })
  vaccination: Vaccination;

  /* Relations */

  @OneToOne(() => SecondDose, (secondDose) => secondDose.user)
  secondDose: SecondDose;

  @OneToOne(() => Univ, (univ) => univ.user)
  univ: Univ;

  @OneToOne(() => Location, (location) => location.user)
  location: Location;

  @OneToMany(() => CheckUp, (checkUp) => checkUp.user)
  checkUpList: CheckUp[];

  @OneToMany(() => Comment, (comment) => comment.user)
  commentList: Comment[];

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
