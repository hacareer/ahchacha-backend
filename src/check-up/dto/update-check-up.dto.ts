import {PartialType, ApiProperty} from '@nestjs/swagger';
import {CreateCheckUpDto} from './create-check-up.dto';
import {IsNumber} from 'class-validator';

export class UpdateCheckUpDto extends PartialType(CreateCheckUpDto) {
  @IsNumber()
  @ApiProperty({example: '1', description: '검사 예약 ID'})
  checkupId: number;
}
