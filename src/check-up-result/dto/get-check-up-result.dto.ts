import {ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from './../../common/dto/base-response.dto';

export class GetCheckUpResultDto {
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
}

export class GetCheckUpResultResponsBodyeDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  statusCode: number;

  @ApiProperty()
  data: GetCheckUpResultDto;
}
