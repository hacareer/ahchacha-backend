import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';
import {UnivCommentTag} from 'src/constants';
import {CreateUnivResponseDto} from './../../univ/response-dto/create-univ-response.dto';
import {univResponseDto} from './../../univ/response-dto/univ-response.dto';
import {BaseUserResponseDto} from './../../user/dto/base-user.dto';

export class UnivCommentResponseDto {
  @ApiProperty({example: '1'})
  id: number;

  @IsNotEmpty()
  @ApiProperty({example: 'T1', description: '내용'})
  content: UnivCommentTag;

  @ApiProperty()
  user: BaseUserResponseDto;

  @ApiProperty()
  univ: univResponseDto;
}
