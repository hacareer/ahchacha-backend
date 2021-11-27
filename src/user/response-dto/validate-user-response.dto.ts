import {PartialType, ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';

export class validateUserResponseDto extends BaseResponseDto {
  @ApiProperty({example: 201})
  code: number;

  @ApiProperty({example: {type: 'once', once_token: '12345678'}})
  data: any;
}
