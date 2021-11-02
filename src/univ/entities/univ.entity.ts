import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

@Entity('univ')
export class Univ {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({ description: '대학 id' })
  id: number;

  @Column()
  name: string;

  /* Relations */

  @OneToOne(() => User, (user) => user.univ)
  user!: User;

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
