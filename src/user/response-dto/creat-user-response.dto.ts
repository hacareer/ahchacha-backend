import {PartialType, ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';
import {BaseResponseIdDto} from '../../common/dto/base-response-id.dto';
import {CreateUserDto} from '../dto/create-user.dto';
import {userResponseDto} from './user-response.dto';

export class CreateUserResponseDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  code: number;

  @ApiProperty()
  data: userResponseDto;
}
