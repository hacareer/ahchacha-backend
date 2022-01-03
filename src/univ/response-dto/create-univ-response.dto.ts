import {PartialType, ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';
import {BaseUnivResponseDto} from './../dto/base-univ.dto';

export class CreateUnivResponseDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  statusCode: number;

  @ApiProperty()
  data: BaseUnivResponseDto;
}
