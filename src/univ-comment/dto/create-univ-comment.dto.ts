import {IsString, IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {UnivTag} from 'src/constants';

export class CreateUnivCommentDto {
  @IsNotEmpty()
  @ApiProperty({example: 'T1', description: '내용'})
  content: UnivTag;
}
