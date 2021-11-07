import {IsString, IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateCheckUpResultDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '2021-01-01T18:00:00.000Z',
    description: '검사 유효기간 시작시간',
  })
  startTime: string;
}
