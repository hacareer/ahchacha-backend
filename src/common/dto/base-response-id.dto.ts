import {ApiProperty} from '@nestjs/swagger';

export class BaseResponseIdDto {
  @ApiProperty({example: '1'})
  id: number;
}
