import {ApiProperty} from '@nestjs/swagger';
import {BaseResponseDto} from 'src/common/dto/base-response.dto';
import {clinicResponseDto} from './clinic-response.dto';
import {OnlyClinicDto} from './only-clinic.dto';

export class OnlyClinicResponseDto extends BaseResponseDto {
  @ApiProperty({example: 200})
  statusCode: number;

  @ApiProperty()
  data: OnlyClinicDto;
}
