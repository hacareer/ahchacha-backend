import {IsString, IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateUnivCommentDto {
  @ApiProperty({example: '38.98918', description: '위도'})
  content: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: '반포역', description: '사용자 주소(도로명)'})
  univId: string;
}
