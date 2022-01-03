import {PartialType, ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from './../../common/dto/base-response.dto';

export class GetRefreshTokenResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  statusCode: number;

  @ApiProperty({
    example:
      '{ "access_token": "12345678", "refresh_token": { "refresh_token": "12345678", "tokenExp": "2021-12-09T10:08:31.000Z" }}',
  })
  data: any;
}
