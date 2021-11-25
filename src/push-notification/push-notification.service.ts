import {Injectable} from '@nestjs/common';
import {SchedulerRegistry} from '@nestjs/schedule';
import {CronJob} from 'cron';
import {CreatePushNotificationDto} from './dto/create-push-notification.dto';

@Injectable()
export class PushNotificationService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  scheduleAlarm(createPushNotificationDto: CreatePushNotificationDto) {
    const date = new Date(createPushNotificationDto.date);
    date.setHours(date.getHours() - 11);
    const job = new CronJob(date, () => {
      // TODO FCM 서버에 푸시 알림
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
