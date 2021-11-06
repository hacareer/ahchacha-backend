import {ApiProperty} from '@nestjs/swagger';
import {IsString} from 'class-validator';
import {ClinicTag} from 'src/constants';

export class CreateClinicCommentDto {
  @IsString()
  @ApiProperty({example: '검진 예약 날짜', description: '2021-11-01-12:00'})
  contentList: ClinicTag[];

  @IsString()
  @ApiProperty({example: '1', description: '사용자 ID'})
  userId: number;

  @IsString()
  @ApiProperty({example: '1', description: '선별진료소 ID'})
  clinicid: number;
}
