import {IsString, IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {UnivTag} from 'src/constants';

export class CreateUnivCommentDto {
  @ApiProperty({example: '내용', description: '대면 수업 힘들어요'})
  content: UnivTag;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: '1', description: '대학교 ID'})
  univId: string;
}
