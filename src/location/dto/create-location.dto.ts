import {User} from 'src/user/entities/user.entity';
import {IsString, IsNotEmpty, IsNumber} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {BaseLocationResponseDto} from './base-location.dto';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';

export class CreateLocationDto {
  @ApiProperty({
    example: '서울특별시 서초구 신반포로 241',
    description: '현재 사용자 위치(도로명 주소)',
  })
  address: string;

  @ApiProperty({
    example: '37.50825',
    description: '현재 사용자 위치(위도)',
  })
  latitude: number;

  @ApiProperty({
    example: '127.011803',
    description: '현재 사용자 위치(경도)',
  })
  longitude: number;
}

export class CreateLocationResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  statusCode: number;

  @ApiProperty()
  data: BaseLocationResponseDto;
}
