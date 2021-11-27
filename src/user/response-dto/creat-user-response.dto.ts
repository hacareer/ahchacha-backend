import {PartialType, ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';
import {userResponseDto} from './user-response.dto';

export class CreateUserResponseDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  code: number;

  @ApiProperty()
  data: userResponseDto;
}
