import {ApiProperty} from '@nestjs/swagger';
import {NotificationTime} from 'src/constants';
export class CreatePushNotificationDto {
  @ApiProperty({example: '2021-01-', description: '예약날짜'})
  date: Date;

  @ApiProperty({example: '1', description: '사용자 ID'})
  userId: number;

  @ApiProperty({example: '테스트', description: '사용자 닉네임'})
  nickname: string;

  @ApiProperty({example: '12345', description: '기기 ID'})
  deviceId: string;

  @ApiProperty({example: '15m', description: '푸시 알림 시간'})
  notification: NotificationTime;

  @ApiProperty({example: '대한병원', description: '선별진료소 이름'})
  clinicName: string;

  @ApiProperty({example: '신반포로 270', description: '선별진료소 주소'})
  clinicAddress: string;
}
