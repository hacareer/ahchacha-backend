import {Module, forwardRef} from '@nestjs/common';
import {ReservationService} from './reservation.service';
import {ReservationController} from './reservation.controller';
import {UserModule} from './../user/user.module';
import {AuthModule} from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => AuthModule)],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
