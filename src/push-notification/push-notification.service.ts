import {Injectable} from '@nestjs/common';
import {SchedulerRegistry} from '@nestjs/schedule';
import {CronJob} from 'cron';
import {CreatePushNotificationDto} from './dto/create-push-notification.dto';
import * as admin from 'firebase-admin';

@Injectable()
export class PushNotificationService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  async scheduleAlarm(createPushNotificationDto: CreatePushNotificationDto) {
    const registrationToken = createPushNotificationDto.deviceId;

    const message = {
      notification: {
        title: '테스트',
        body: '✨검사 2시간 전 알람입니다.',
      },
      token: registrationToken,
    };
    const date = new Date(createPushNotificationDto.date);
    date.setHours(date.getHours() - 11);
    const job = new CronJob(date, async () => {
      await admin
        .messaging()
        .sendToDevice(registrationToken, message)
        .then((response) => {
          console.log('Successfully sent message:', response);
        })
        .catch((error) => {
          console.log('Error sending message:', error);
        });
    });

    this.schedulerRegistry.addCronJob(
      `${createPushNotificationDto.userId}-${date}`,
      job,
    );
    job.start();
  }

  getCrons() {
    const jobs = this.schedulerRegistry.getCronJobs();
    jobs.forEach((value, key, map) => {
      let next;
      try {
        next = value.nextDates().toDate();
      } catch (e) {
        next = 'error: next fire date is in the past!';
      }
    });
  }

  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
  }
}
