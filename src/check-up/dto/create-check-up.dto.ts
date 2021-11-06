import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';

export class CreateCheckUpDto {
  @IsString()
  @ApiProperty({example: '검진 예약 날짜', description: '2021-11-01-12:00'})
  day: string;

  @IsString()
  @ApiProperty({example: '1', description: '사용자 ID'})
  userId: number;

  @IsString()
  @ApiProperty({example: '1', description: '선별진료소 ID'})
  clinicid: number;
}
