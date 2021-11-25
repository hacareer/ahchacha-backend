import {ApiProperty} from '@nestjs/swagger';
export class CreatePushNotificationDto {
  @ApiProperty({example: '2021-01-', description: '예약날짜'})
  date: Date;

  @ApiProperty({example: '1', description: '사용자 ID'})
  userId: number;

  @ApiProperty({example: '12345', description: '기기 ID'})
  deviceId: string;
}
