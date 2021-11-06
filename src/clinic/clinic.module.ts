import {Module, forwardRef} from '@nestjs/common';
import {ClinicService} from './clinic.service';
import {ClinicController} from './clinic.controller';
import {Clinic} from './entities/clinic.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from 'src/user/user.module';
import {AuthModule} from 'src/auth/auth.module';
import {CheckUp} from 'src/check-up/entities/check-up.entity';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Clinic]),
  ],
  controllers: [ClinicController],
  providers: [ClinicService],
})
export class ClinicModule {}
