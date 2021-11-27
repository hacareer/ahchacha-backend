import {PartialType, ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';
import {CinicCommentResponseDto} from './clinic-comment-response.dto';

export class GetCinicCommentResponseDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  statusCode: number;

  @ApiProperty({
    example:
      '[{ "content": "T1", "number": "1" }, { "content": "T2", "number": "1" }, { "content": "T3", "number": "1" }, { "content": "T4", "number": "1" }, { "content": "T5", "number": "1" }]',
  })
  data: any;
}
