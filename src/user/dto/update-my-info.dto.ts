import {ApiProperty} from '@nestjs/swagger';
import {BaseUpdateResponseDto} from './../../common/dto/base-update-response.dto';

export class UpdateMyInfoDto extends BaseUpdateResponseDto {
  @ApiProperty({example: 'test'})
  nickname: string;

  @ApiProperty({example: '1'})
  univId: number;
}

export class UpdateMyInfoResponseDto extends BaseUpdateResponseDto {
  @ApiProperty({example: 'Record successfully updated'})
  data: string;
}

export class UpdateMyInfoResponseBodyDto extends BaseUpdateResponseDto {
  @ApiProperty({example: 200})
  statusCode: number;

  @ApiProperty()
  data: UpdateMyInfoResponseDto;
}
