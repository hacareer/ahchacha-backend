import {PartialType, ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';
import {UnivCommentResponseDto} from './univ-comment-response.dto';

export class GetUnivCommentResponseDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  code: number;

  @ApiProperty({
    example: '{ "content": "T1", "user": { "nickname": "test"}}',
  })
  data: any;
}
