import {PartialType, ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from './../../common/dto/base-response.dto';

export class UpdateUserResponseDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  statusCode: number;

  @ApiProperty({example: 'Record successfully updated'})
  data;
}
