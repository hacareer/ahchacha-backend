import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';

export class CreateCheckUpDto {
  @IsString()
  @ApiProperty({example: '1', description: '선별진료소 ID'})
  clinicId: string;

  @IsString()
  @ApiProperty({example: '2021-01-03T01:13Z', description: '검사 예약 날짜'})
  date: string;
}
