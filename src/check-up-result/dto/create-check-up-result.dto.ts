import {IsString, IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateCheckUpResultDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: '2021-03-01', description: '검사 유효기간 시작시간'})
  startTime: string;

  @ApiProperty({example: '1', description: '선별지료소 Id'})
  clinicId: string;
}
