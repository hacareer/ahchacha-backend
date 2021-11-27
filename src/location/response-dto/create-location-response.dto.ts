import {ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';
import {LocationResponseDto} from './location-response.dto';

export class CreateLocationResponseDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  code: number;

  @ApiProperty()
  data: LocationResponseDto;
}
