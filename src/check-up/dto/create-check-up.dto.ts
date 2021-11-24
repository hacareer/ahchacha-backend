import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString, IsNumber, IsDate} from 'class-validator';

export class CreateCheckUpDto {
  @IsNumber()
  @ApiProperty({example: '1', description: '선별진료소 ID'})
  clinicId: number;

  @IsDate()
  @ApiProperty({example: '2021-01-03T01:13Z', description: '검사 예약 날짜'})
  date: Date;
}
