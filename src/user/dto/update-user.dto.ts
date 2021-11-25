import {PartialType, ApiProperty} from '@nestjs/swagger';
import {IsString, IsNotEmpty} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: 'test', description: '사용자 닉네임'})
  nickname: string;

  @ApiProperty({example: '1', description: '사용자 학교 ID'})
  univId: number;
}
