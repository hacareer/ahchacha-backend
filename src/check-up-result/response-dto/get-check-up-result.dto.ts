import {PartialType, ApiProperty} from '@nestjs/swagger';

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
