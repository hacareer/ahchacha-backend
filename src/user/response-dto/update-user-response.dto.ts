import {PartialType, ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';
import {userResponseDto} from './user-response.dto';

export class UpdateUserResponseDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  statusCode: number;

  @ApiProperty({example: 'Record successfully updated'})
  data;
}
