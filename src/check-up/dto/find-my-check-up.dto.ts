import {PartialType, ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';
import {BaseCheckUpDto} from './base-check-up.dto';

export class findMyCheckUpResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  statusCode: number;

  @ApiProperty()
  data: BaseCheckUpDto;
}
