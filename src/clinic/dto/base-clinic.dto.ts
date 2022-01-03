import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';
import {Label} from 'src/constants';
import {BaseOpearationHourResponseDto} from './base-opearion-hour.dto';

export class BaseClinicResponseDto {
  @IsString()
  @ApiProperty({example: '1', description: '선별진료소 ID'})
  id: number;

  @IsNotEmpty()
  @ApiProperty({
    example: '한국병원',
    description: '선별진료소 이름',
  })
  name: string;

  @ApiProperty({
    example: 'TEMPORARY',
    description: '선별진료소 / 임시선별진료소',
  })
  label: Label;

  @ApiProperty({
    example: '서울특별시 서초구 신반포로 241',
    description: '선별진료소 위치(도로명 주소)',
  })
  address: string;

  @ApiProperty({
    example: '37.50825',
    description: '선별진료소 위치(위도)',
  })
  latitude: number;

  @ApiProperty({
    example: '127.011803',
    description: '선별진료소 위치(경도)',
  })
  longitude: number;

  @ApiProperty({example: '123-456-789', description: '선별진료소 전화번호'})
  telephone: string;

  @ApiProperty()
  operationHour: BaseOpearationHourResponseDto;
}
