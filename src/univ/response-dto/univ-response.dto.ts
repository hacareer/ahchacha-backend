import {PartialType, ApiProperty} from '@nestjs/swagger';
import {IsString, IsNotEmpty} from 'class-validator';

export class univResponseDto {
  @ApiProperty({example: '1'})
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: '한국대학교', description: '학교 이름'})
  name: string;
}
