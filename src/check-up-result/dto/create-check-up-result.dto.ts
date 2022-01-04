import {IsString, IsNotEmpty, IsDate} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from './../../common/dto/base-response.dto';
import {BaseUserResponseDto} from './../../user/dto/base-user.dto';

export class CreateCheckUpResultDto {
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    example: '2021-01-03T01:13Z',
    description: '검사 유효기간 시작시간',
  })
  startTime: Date;
}

export class CreateCheckUpResultResponseDto extends BaseResponseDto {
  @ApiProperty({example: '1'})
  id: number;

  @ApiProperty({
    example: '2021-01-03T01:13:00.000Z',
    description: '검사 유효기간 시작',
  })
  startTime: string;

  @ApiProperty({
    example: '2021-01-03T01:13:00.000Z',
    description: '검사 유효기간 끝',
  })
  finishTime: string;

  @ApiProperty()
  user: BaseUserResponseDto;
}

export class CreateCheckUpResultResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 201})
  statusCode: number;

  @ApiProperty()
  data: CreateCheckUpResultResponseDto;
}
