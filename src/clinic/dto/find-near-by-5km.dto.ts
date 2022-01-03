import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString} from 'class-validator';
import {Label} from 'src/constants';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';

export class FindNearBy5KmResponseDto {
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

  @IsString()
  @ApiProperty({example: '1', description: '운영시간 ID'})
  operationHourId: number;

  @ApiProperty({
    example: '3.290667780403333',
    description: '현재위치로부터 선별진료소까지의 거리',
  })
  distance: number;
}

export class FindNearBy5KmResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  statusCode: number;

  @ApiProperty()
  data: FindNearBy5KmResponseDto;
}
