import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {Vaccination} from '../../constants';
import {SecondDose} from 'src/second-dose/entities/second-dose.entity';
import {Univ} from './../../univ/entities/univ.entity';
import {Location} from '../../location/entities/location.entity';
import {ClinicComment} from 'src/clinic-comment/entities/clinic-comment.entity';
import {UnivComment} from 'src/univ-comment/entities/univ-comment.entity';
import {CheckUpResult} from 'src/check-up-result/entities/check-up-result.entity';
import {CheckUp} from 'src/check-up/entities/check-up.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nickname: string;

  @Column()
  kakaoAccount: string;

  @Column({type: 'text', nullable: true})
  refreshToken: string;

  @Column({
    type: 'enum',
    enum: Vaccination,
    nullable: true,
  })
  vaccination: Vaccination;

  @Column({nullable: true})
  deviceId: string;

  /* Relations */
  @OneToOne(() => SecondDose, (secondDose) => secondDose.user)
  secondDose: SecondDose;

  @JoinColumn()
  @OneToOne(() => Location, (location) => location.user)
  location: Location;

  @ManyToOne(() => Univ, (univ) => univ.userList)
  univ: Univ;

  @OneToMany(() => CheckUp, (checkUp) => checkUp.user)
  checkUpList: CheckUp[];

  @OneToMany(() => CheckUpResult, (checkUpResult) => checkUpResult.user)
  checkUpResultList: CheckUpResult[];

  @OneToMany(() => ClinicComment, (clinicComment) => clinicComment.user)
  clinicCommentList: ClinicComment[];

  @OneToMany(() => UnivComment, (univComment) => univComment.user)
  univCommentList: UnivComment[];

  /* Date Columns */

  @CreateDateColumn({select: false})
  createdAt: Date;

  @UpdateDateColumn({select: false})
  updatedAt: Date;

  @DeleteDateColumn({select: false})
  deletedAt: Date | null;
}
