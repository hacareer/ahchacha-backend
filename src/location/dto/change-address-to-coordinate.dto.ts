import {ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';

export class ChangeAddressToCoordinateDto {
  @ApiProperty({
    example: '서울특별시 서초구 신반포로 241',
    description: '현재 사용자 위치(도로명 주소)',
  })
  address: string;
}

export class ChangeAddressToCoordinateResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  statusCode: number;

  @ApiProperty({
    example: '{ "latitude": "37.50832", "longitude": "127.011803"}',
  })
  data: any;
}
