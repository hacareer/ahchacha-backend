import {PartialType, ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';

export class DeleteCheckUpResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 201})
  statusCode: number;

  @ApiProperty({example: 'Record successfully deleted'})
  data: any;
}
