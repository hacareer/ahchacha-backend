import { PartialType } from '@nestjs/swagger';
import { CreatePushNotificationDto } from './create-push-notification.dto';

export class UpdatePushNotificationDto extends PartialType(CreatePushNotificationDto) {}
