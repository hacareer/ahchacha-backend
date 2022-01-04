import {Injectable} from '@nestjs/common';
import {SchedulerRegistry} from '@nestjs/schedule';
import {CronJob} from 'cron';
import {CreatePushNotificationDto} from './dto/create-push-notification.dto';
import * as admin from 'firebase-admin';
import {NotificationTime, NotificationWord} from './constants';

@Injectable()
export class PushNotificationService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  async scheduleAlarm(createPushNotificationDto: CreatePushNotificationDto) {
    const registrationToken = createPushNotificationDto.deviceId;
    const notificationWord =
      NotificationWord[createPushNotificationDto.notification];
    const clinicName = createPushNotificationDto.clinicName;
    const clinicAddress = createPushNotificationDto.clinicAddress;
    const replacedClinicAddress = clinicAddress.replace(clinicName, '');
    const message = {
      notification: {
        title: `${createPushNotificationDto.nickname}님, ${notificationWord}시간 후에 PCR 검사를 꼭 받으세요.`,
        body: `${clinicName}(${replacedClinicAddress})`,
      },
      token: registrationToken,
    };
    const timebeforeCheck =
      NotificationTime[createPushNotificationDto.notification];
    parseInt(timebeforeCheck);
    const date = new Date(createPushNotificationDto.date);
    date.setMinutes(date.getMinutes() - timebeforeCheck);
    date.setHours(date.getHours() - 9);
    const job = new CronJob(date, async () => {
      await admin
        .messaging()
        .send(message)
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
