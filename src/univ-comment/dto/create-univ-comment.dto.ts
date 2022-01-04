import {IsString, IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';
import {BaseUnivCommentResponseDto} from './base-univ-comment.dto';
import {UnivCommentTag} from 'src/univ-comment/entities/univ-comment.entity';

export class CreateUnivCommentDto {
  @IsNotEmpty()
  @ApiProperty({example: 'T1', description: '내용'})
  content: UnivCommentTag;
}

export class CreateUnivCommentResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 201})
  statusCode: number;

  @ApiProperty()
  data: BaseUnivCommentResponseDto;
}
