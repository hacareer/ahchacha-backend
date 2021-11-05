import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCheckUpDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '2021-03-01', description: '검사 유효기간 시작시간' })
  startTime: Date;

  @IsNotEmpty()
  @ApiProperty({ example: '2021-03-03', description: '결과 유호기간 종료시간' })
  finishTime: Date;

  @ApiProperty({ example: 'NO', description: '검사 결과' })
  result: string;

  @ApiProperty({ example: '1', description: '선별지료소 Id' })
  clinicId: string;
}
