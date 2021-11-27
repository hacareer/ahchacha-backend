import {ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from './../../common/dto/base-response.dto';
import {GetCheckUpResultDto} from './get-check-up-result.dto';

export class GetCheckUpResultResponseDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  statusCode: number;

  @ApiProperty()
  data: GetCheckUpResultDto;
}
