import {Module, forwardRef} from '@nestjs/common';
import {CheckUpResultService} from './check-up-result.service';
import {CheckUpResultController} from './check-up-result.controller';
import {UserModule} from 'src/user/user.module';
import {AuthModule} from 'src/auth/auth.module';
import {CheckUpResult} from './entities/check-up-result.entity';
import {User} from 'src/user/entities/user.entity';
import {Clinic} from 'src/clinic/entities/clinic.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([CheckUpResult, User, Clinic]),
  ],
  controllers: [CheckUpResultController],
  providers: [CheckUpResultService],
})
export class CheckUpResultModule {}
