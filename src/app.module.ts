import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {UnivModule} from './univ/univ.module';
import {SecondDoseModule} from './second-dose/second-dose.module';
import {ClinicModule} from './clinic/clinic.module';
import {LocationModule} from './location/location.module';
import {UnivCommentModule} from './univ-comment/univ-comment.module';
import {ClinicCommentModule} from './clinic-comment/clinic-comment.module';
import {CheckUpResultModule} from './check-up-result/check-up-result.module';
import {CheckUpModule} from './check-up/check-up.module';
import {UserModule} from 'src/user/user.module';
import {ScheduleModule} from '@nestjs/schedule';
import {PushNotificationModule} from './push-notification/push-notification.module';
import authConfig from './common/config/auth.config';
import databaseConfig from './common/config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, authConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService],
    }),
    UserModule,
    ClinicModule,
    SecondDoseModule,
    UnivModule,
    UnivCommentModule,
    AuthModule,
    LocationModule,
    UnivCommentModule,
    ClinicCommentModule,
    CheckUpResultModule,
    CheckUpModule,
    ScheduleModule.forRoot(),
    PushNotificationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
