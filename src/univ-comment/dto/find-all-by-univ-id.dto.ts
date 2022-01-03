import {PartialType, ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';

export class FindAllByUnivIdResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  statusCode: number;

  @ApiProperty({
    example: '{ "content": "T1", "user": { "nickname": "test"}}',
  })
  data: any;
}
