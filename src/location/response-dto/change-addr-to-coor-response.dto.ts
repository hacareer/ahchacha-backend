import {ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';
import {LocationResponseDto} from './location-response.dto';

export class ChangeAddressToCoordinateResponseDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  statusCode: number;

  @ApiProperty({
    example: '{ "latitude": "37.50832", "longitude": "127.011803"}',
  })
  data: LocationResponseDto;
}
