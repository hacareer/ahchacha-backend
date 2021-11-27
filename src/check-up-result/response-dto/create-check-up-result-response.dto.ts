import {PartialType, ApiProperty} from '@nestjs/swagger';
import {CheckUpResultResponseDto} from './check-up-result.dto';
import {BaseResponseDto} from './../../common/dto/base-response.dto';

export class CreateCheckUpResultResponseDto extends BaseResponseDto {
  @ApiProperty({example: 201})
  statusCode: number;

  @ApiProperty()
  data: CheckUpResultResponseDto;
}
