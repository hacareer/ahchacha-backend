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

  @Column()
  latitude: Float32Array;

  @Column()
  longitude: Float32Array;

  @Column()
  telephone: string;

  /* Relations */

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
