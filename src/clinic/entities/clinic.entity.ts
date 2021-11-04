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
import { Comment } from 'src/comment/entities/comment.entity';
import { OperationHour } from './opening-hour.entity';
import { Label } from '../../constants';
import { CheckUp } from 'src/check-up/entities/check-up.entity';

@Entity('clinic')
export class Clinic {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({ description: '선별진료소 id' })
  id: number;

  @Column({
    type: 'enum',
    enum: Label,
    nullable: true,
  })
  label: Label;

  @Column()
  address: string;

  @Column({ type: 'decimal', precision: 7, scale: 5, default: 0 })
  latitude: number;

  @Column({ type: 'decimal', precision: 9, scale: 6, default: 0 })
  longitude: number;

  @Column()
  telephone: string;

  /* Relations */

  @OneToMany(() => CheckUp, (checkUp) => checkUp.clinic)
  checkUpList: CheckUp[];

  @OneToMany(() => Comment, (comment) => comment.clinic)
  commentList: Comment[];

  @OneToOne(() => OperationHour, (operationHour) => operationHour.clinic)
  operationHour!: OperationHour;

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
