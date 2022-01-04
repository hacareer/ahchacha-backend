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
import {SecondDose} from './../../second-dose/entities/second-dose.entity';
import {Location} from './../../location/entities/location.entity';
import {Univ} from './../../univ/entities/univ.entity';
import {CheckUp} from './../../check-up/entities/check-up.entity';
import {CheckUpResult} from './../../check-up-result/entities/check-up-result.entity';
import {ClinicComment} from './../../clinic-comment/entities/clinic-comment.entity';
import {UnivComment} from './../../univ-comment/entities/univ-comment.entity';

export enum Vaccination {
  YES = 'YES', // 백신 2차 접종자
  NO = 'NO', // 백신 2차 미접종자
}

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
