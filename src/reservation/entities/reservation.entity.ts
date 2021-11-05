export class Reservation {
  @PrimaryGeneratedColumn('increment')
  @ApiProperty({description: '검사기록 id'})
  id: number;

  @Column()
  startTime: Date;

  @Column()
  finishTime: Date;

  /* Relations */

  @ManyToOne(() => User, (user) => user.checkUpList)
  user!: User;

  @ManyToOne(() => Clinic, (clinic) => clinic.checkUpList)
  clinic!: Clinic;

  /* Date Columns */

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
