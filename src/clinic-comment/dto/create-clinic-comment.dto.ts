import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsString} from 'class-validator';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';
import {BaseCinicCommentResponseDto} from './base-clinic-comment.dto';

export class CreateClinicCommentDto {
  @IsNumber()
  @ApiProperty({example: '1', description: '선별진료소 ID'})
  clinicid: number;

  @ApiProperty({example: 'T1,T2,T3', description: '후기 태그 리스트'})
  contents: string;
}

export class CreateCinicCommentResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 201})
  statusCode: number;

  @ApiProperty()
  data: BaseCinicCommentResponseDto;
}
