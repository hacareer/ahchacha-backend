import {PartialType, ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';
import {UnivCommentResponseDto} from './univ-comment-response.dto';

export class CreateUnivCommentResponseDto extends BaseResponseDto {
  @ApiProperty({example: 201})
  code: number;

  @ApiProperty()
  data: UnivCommentResponseDto;
}
