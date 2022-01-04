import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';
import {BaseUserResponseDto} from '../../user/dto/base-user.dto';
import {BaseUnivResponseDto} from '../../univ/dto/base-univ.dto';
import {UnivCommentTag} from '../entities/univ-comment.entity';

export class BaseUnivCommentResponseDto {
  @ApiProperty({example: '1'})
  id: number;

  @IsNotEmpty()
  @ApiProperty({example: 'T1', description: '내용'})
  content: UnivCommentTag;

  @ApiProperty()
  user: BaseUserResponseDto;

  @ApiProperty()
  univ: BaseUnivResponseDto;
}
