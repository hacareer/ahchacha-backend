import {PartialType, ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';

export class registerUserResponseDto extends BaseResponseDto {
  @ApiProperty({example: 201})
  code: number;

  @ApiProperty({example: {access_token: '12345678', refresh_token: '12345678'}})
  data: any;
}