import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';
import {UnivCommentTag} from 'src/constants';
import {CreateUserResponseDto} from 'src/user/response-dto/creat-user-response.dto';
import {CreateUnivResponseDto} from './../../univ/response-dto/create-univ-response.dto';
import {userResponseDto} from './../../user/response-dto/user-response.dto';
import {univResponseDto} from './../../univ/response-dto/univ-response.dto';

export class UnivCommentResponseDto {
  @ApiProperty({example: '1'})
  id: number;

  @IsNotEmpty()
  @ApiProperty({example: 'T1', description: '내용'})
  content: UnivCommentTag;

  @ApiProperty()
  user: userResponseDto;

  @ApiProperty()
  univ: univResponseDto;
}
