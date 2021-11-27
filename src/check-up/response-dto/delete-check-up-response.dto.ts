import {PartialType, ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';
import {CheckUpDto} from './check-up.dto';
import {CreateCheckUpDto} from './../dto/create-check-up.dto';
import {JoinCreateCheckUpDto} from './join-check-updto';

export class DeleteCheckUpResponseDto extends BaseResponseDto {
  @ApiProperty({example: 201})
  statusCode: number;

  @ApiProperty({example: 'Record successfully deleted'})
  data: any;
}
