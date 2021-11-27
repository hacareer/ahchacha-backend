import {PartialType, ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';
import {univResponseDto} from './univ-response.dto';

export class CreateUnivResponseDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  code: number;

  @ApiProperty()
  data: univResponseDto;
}
