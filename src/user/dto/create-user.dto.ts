import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '아마따', description: '사용자 닉네임' })
  nickname: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'NO', description: '앱 진입시 백신 2차 접종 유무' })
  vaccination: string;

  @IsNotEmpty()
  @ApiProperty({ example: '1', description: '사용자 학교 Id' })
  univId: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '서울특별시 서초구 신반포로 241',
    description: '사용자 위치(도로명 주소)',
  })
  location: string;
}
