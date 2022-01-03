import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from '../../common/dto/base-response.dto';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '12345678',
    description: '카카오에서 발급하는 idToken',
  })
  kakaoToken: string;
}

export class SignInResponseBodyDto extends BaseResponseDto {
  @ApiProperty({example: 201})
  statusCode: number;

  @ApiProperty({example: {type: 'once', once_token: '12345678'}})
  data: any;
}
