import {PartialType, ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';
import {CinicCommentResponseDto} from './clinic-comment-response.dto';

export class CreateCinicCommentResponseDto extends BaseResponseDto {
  @ApiProperty({example: 201})
  statusCode: number;

  @ApiProperty()
  data: CinicCommentResponseDto;
}
