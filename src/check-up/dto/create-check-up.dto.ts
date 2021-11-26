import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty, IsString, IsNumber, IsDate} from 'class-validator';
import {NotificationTime} from 'src/constants';

export class CreateCheckUpDto {
  @IsNumber()
  @ApiProperty({example: '1', description: '선별진료소 ID'})
  clinicId: number;

  @IsDate()
  @ApiProperty({example: '2021-01-03T01:13Z', description: '검사 예약 날짜'})
  date: Date;

  @ApiProperty({example: '15M', description: '푸시 알림 받고 싶은 시간'})
  notificationTime: NotificationTime;
}
