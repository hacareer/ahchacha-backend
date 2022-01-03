import {BaseResponseDto} from 'src/common/dto/base-response.dto';
import {ApiProperty} from '@nestjs/swagger';
import {BaseLocationResponseDto} from './base-location.dto';

export class GetLocationResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  statusCode: number;

  @ApiProperty()
  data: BaseLocationResponseDto;
}
