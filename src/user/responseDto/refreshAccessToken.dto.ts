import {PartialType, ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';

export class refreshAccessTokenDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  code: number;

  @ApiProperty({example: 'new accessToken Issuance success'})
  data: any;
}
