import {PartialType, ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';
import {CheckUpDto} from './check-up.dto';
import {CreateCheckUpDto} from './../dto/create-check-up.dto';
import {JoinCreateCheckUpDto} from './join-check-updto';

export class CreateCheckUpResponseDto extends BaseResponseDto {
  @ApiProperty({example: 201})
  statusCode: number;

  @ApiProperty()
  data: JoinCreateCheckUpDto;
}
