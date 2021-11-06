import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsString} from 'class-validator';
import {ClinicTag} from 'src/constants';

export class CreateClinicCommentDto {
  @ApiProperty({example: '검진 예약 날짜', description: '2021-11-01-12:00'})
  contents: string;

  @IsNumber()
  @ApiProperty({example: '1', description: '사용자 ID'})
  userId: number;

  @IsNumber()
  @ApiProperty({example: '1', description: '선별진료소 ID'})
  clinicid: number;
}
