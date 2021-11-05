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
import {CheckUp} from 'src/check-up/entities/check-up.entity';
import {SecondDose} from 'src/second-dose/entities/second-dose.entity';
import {Univ} from './../../univ/entities/univ.entity';
import {Location} from '../../location/entities/location.entity';
import {ClinicComment} from 'src/clinic-comment/entities/clinic-comment.entity';
import {UnivComment} from 'src/univ-comment/entities/univ-comment.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({description: '사용자 id'})
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

  /* Relations */
  @JoinColumn()
  @OneToOne(() => SecondDose, (secondDose) => secondDose.user)
  secondDose: SecondDose;

  @OneToMany(() => Location, (location) => location.user)
  locationList: Location[];

  @ManyToOne(() => Univ, (univ) => univ.userList)
  univ: Univ;

  @OneToMany(() => CheckUp, (checkUp) => checkUp.user)
  checkUpList: CheckUp[];

  @OneToMany(() => ClinicComment, (clinicComment) => clinicComment.user)
  clinicCommentList: ClinicComment[];

  @OneToMany(() => UnivComment, (univComment) => univComment.user)
  univCommentList: UnivComment[];

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
