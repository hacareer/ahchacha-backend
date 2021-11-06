import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsString} from 'class-validator';
import {ClinicTag} from 'src/constants';

export class CreateClinicCommentDto {
  @ApiProperty({example: '후기 태그', description: 'T1'})
  contents: string;

  @IsNumber()
  @ApiProperty({example: '1', description: '선별진료소 ID'})
  clinicid: number;
}
