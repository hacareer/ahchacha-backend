import {Module, forwardRef} from '@nestjs/common';
import {CheckUpService} from './check-up.service';
import {CheckUpController} from './check-up.controller';
import {UserModule} from 'src/user/user.module';
import {AuthModule} from 'src/auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CheckUp} from './entities/check-up.entity';
import {User} from 'src/user/entities/user.entity';
import {Clinic} from 'src/clinic/entities/clinic.entity';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([CheckUp, User, Clinic]),
  ],
  controllers: [CheckUpController],
  providers: [CheckUpService],
})
export class CheckUpModule {}
