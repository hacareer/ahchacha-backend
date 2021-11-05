import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class KakaoUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({description: '카카오에서 발급하는 idToken'})
  idToken: string;
}
