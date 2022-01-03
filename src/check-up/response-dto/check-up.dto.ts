import {ApiProperty} from '@nestjs/swagger';
import {FindNearBy5KmResponseDto} from './../../clinic/dto/find-near-by-5km.dto';

export class CheckUpDto {
  @ApiProperty({example: '1'})
  id: number;

  @ApiProperty({example: '2021-01-03T01:13:00.000Z'})
  date: string;

  @ApiProperty()
  clinic: FindNearBy5KmResponseDto;
}
