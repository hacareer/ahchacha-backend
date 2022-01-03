import {PartialType, ApiProperty} from '@nestjs/swagger';
import {IsString, IsNotEmpty} from 'class-validator';
import {LocationResponseDto} from '../../location/response-dto/location-response.dto';
import {univResponseDto} from '../../univ/response-dto/univ-response.dto';
import {Vaccination} from '../../constants';

export class BaseUserResponseDto {
  @ApiProperty({example: '1'})
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: 'test', description: '사용자 닉네임'})
  nickname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: '12345678', description: '사용자 닉네임'})
  kakaoAccount: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: '12345678', description: '사용자 닉네임'})
  refreshToken: string;

  @IsNotEmpty()
  @ApiProperty({example: 'NO', description: '앱 진입시 백신 2차 접종 유무'})
  vaccination: Vaccination;

  @ApiProperty({example: '123456789', description: '사용자 기기 ID'})
  deviceId: string;

  @ApiProperty()
  location: LocationResponseDto;

  @ApiProperty()
  univ: univResponseDto;
}
