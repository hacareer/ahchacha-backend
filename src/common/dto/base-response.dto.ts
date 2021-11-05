import {ApiProperty} from '@nestjs/swagger';

export class BaseResponseDto {
  @ApiProperty({example: 'true'})
  success: string;

  @ApiProperty({example: 200})
  code: number;
}
