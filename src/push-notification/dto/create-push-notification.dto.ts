import {ApiProperty} from '@nestjs/swagger';
export class CreatePushNotificationDto {
  @ApiProperty({example: '2021-01-', description: '예약날짜'})
  date: Date;

  @ApiProperty({example: '2021-01-', description: '사용자 ID'})
  userId: number;
}
