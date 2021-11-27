import {ApiProperty} from '@nestjs/swagger';
import {OnlyClinicDto} from './../../clinic/response-dto/only-clinic.dto';

export class CheckUpDto {
  @ApiProperty({example: '1'})
  id: number;

  @ApiProperty({example: '2021-01-03T01:13:00.000Z'})
  date: string;

  @ApiProperty()
  clinic: OnlyClinicDto;
}
