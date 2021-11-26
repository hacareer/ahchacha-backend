import {ApiProperty} from '@nestjs/swagger';

export class ChangeAddressToCoordinateDto {
  @ApiProperty({
    example: '서울특별시 서초구 신반포로 241',
    description: '현재 사용자 위치(도로명 주소)',
  })
  address: string;
}
