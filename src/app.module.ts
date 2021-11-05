import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {AuthModule} from './auth/auth.module';
import {UnivModule} from './univ/univ.module';
import {SecondDoseModule} from './second-dose/second-dose.module';
import {CheckUpModule} from './check-up/check-up.module';
import {ClinicModule} from './clinic/clinic.module';
import {UserModule} from './user/user.module';
import {LocationModule} from './location/location.module';
import {UnivCommentModule} from './univ-comment/univ-comment.module';
import {ClinicCommentModule} from './clinic-comment/clinic-comment.module';
import * as ormconfig from '../ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
    ClinicModule,
    CheckUpModule,
    SecondDoseModule,
    UnivModule,
    UnivCommentModule,
    AuthModule,
    LocationModule,
    UnivCommentModule,
    ClinicCommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
