import {BaseResponseDto} from '../../common/dto/base-response.dto';
import {ApiProperty} from '@nestjs/swagger';
import {BaseUnivResponseDto} from './base-univ.dto';

export class FindAllResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  statusCode: number;

  @ApiProperty()
  data: BaseUnivResponseDto;
}
