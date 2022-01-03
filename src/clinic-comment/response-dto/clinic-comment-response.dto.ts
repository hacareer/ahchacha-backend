import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';
import {ClinicCommentTag, UnivCommentTag} from 'src/constants';
import {userResponseDto} from '../../user/dto/base-user.dto';
import {OnlyClinicDto} from './../../clinic/response-dto/only-clinic.dto';
import {BaseResponseDto} from './../../common/dto/base-response.dto';

export class CinicCommentResponseDto extends BaseResponseDto {
  @ApiProperty({example: '1'})
  id: number;

  @IsNotEmpty()
  @ApiProperty({example: 'T1', description: '내용'})
  content: ClinicCommentTag;

  @ApiProperty()
  user: userResponseDto;

  @ApiProperty()
  clinic: OnlyClinicDto;
}
