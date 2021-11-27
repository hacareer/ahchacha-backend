import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';
import {Label} from 'src/constants';

export class opearationHourResponseDto {
  @IsString()
  @ApiProperty({example: '1', description: '선별진료소 ID'})
  id: number;

  @IsNotEmpty()
  @ApiProperty({
    example: '9:00',
    description: '평일 오픈시간',
  })
  weekdayOpen: string;

  @ApiProperty({
    example: '9:00',
    description: '평일 마감시간',
  })
  weekdayClose: string;

  @ApiProperty({
    example: '9:00',
    description: '토요일 오픈시간',
  })
  saturdayOpen: string;

  @ApiProperty({
    example: '9:00',
    description: '토요일 마감시간',
  })
  saturdayClose: string;

  @ApiProperty({
    example: '9:00',
    description: '일요일 오픈시간',
  })
  sundayOpen: string;

  @ApiProperty({example: '9:00', description: '일요일 마감시간'})
  sundayClose: string;
}
