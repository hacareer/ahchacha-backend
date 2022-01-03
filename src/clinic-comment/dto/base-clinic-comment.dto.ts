import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';
import {ClinicCommentTag} from 'src/constants';
import {BaseResponseDto} from '../../common/dto/base-response.dto';
import {BaseUserResponseDto} from '../../user/dto/base-user.dto';
import {FindNearBy5KmResponseDto} from '../../clinic/dto/find-near-by-5km.dto';

export class BaseCinicCommentResponseDto {
  @ApiProperty({example: '1'})
  id: number;

  @IsNotEmpty()
  @ApiProperty({example: 'T1', description: '내용'})
  content: ClinicCommentTag;

  @ApiProperty()
  user: BaseUserResponseDto;

  @ApiProperty()
  clinic: FindNearBy5KmResponseDto;
}

export class BaseCinicCommentResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: '1'})
  id: number;

  @IsNotEmpty()
  @ApiProperty({example: 'T1', description: '내용'})
  content: ClinicCommentTag;

  @ApiProperty()
  user: BaseUserResponseDto;

  @ApiProperty()
  clinic: FindNearBy5KmResponseDto;
}
