import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsDate} from 'class-validator';
import {NotificationTime} from 'src/push-notification/constants';
import {FindNearBy5KmResponseDto} from './../../clinic/dto/find-near-by-5km.dto';
import {BaseUserResponseDto} from './../../user/dto/base-user.dto';

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

export class CreateCheckUpResponseDto {
  @ApiProperty({example: '1'})
  id: number;

  @ApiProperty({example: '2021-01-03T01:13:00.000Z'})
  date: string;

  @ApiProperty()
  clinic: FindNearBy5KmResponseDto;

  @ApiProperty()
  user: BaseUserResponseDto;
}

export class CreateCheckUpResponseBodyDto {
  @ApiProperty({example: 201})
  statusCode: number;

  @ApiProperty()
  data: CreateCheckUpResponseDto;
}
