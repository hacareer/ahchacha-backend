import {ApiProperty} from '@nestjs/swagger';
import {OnlyClinicDto} from '../../clinic/response-dto/only-clinic.dto';
import {userResponseDto} from '../../user/response-dto/user-response.dto';

export class JoinCreateCheckUpDto {
  @ApiProperty({example: '1'})
  id: number;

  @ApiProperty({example: '2021-01-03T01:13:00.000Z'})
  date: string;

  @ApiProperty()
  clinic: OnlyClinicDto;

  @ApiProperty()
  user: userResponseDto;
}
