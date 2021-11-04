import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { UnivModule } from './univ/univ.module';
import { SecondDoseModule } from './second-dose/second-dose.module';
import { CheckUpModule } from './check-up/check-up.module';
import { ClinicModule } from './clinic/clinic.module';
import { UserModule } from './user/user.module';
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
    CommentModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
