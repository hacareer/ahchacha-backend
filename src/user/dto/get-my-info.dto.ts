import {PartialType, ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from './../../common/dto/base-response.dto';
import {BaseUserResponseDto} from './base-user.dto';

export class GetMyInfoResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  statusCode: number;

  @ApiProperty()
  data: BaseUserResponseDto;
}
