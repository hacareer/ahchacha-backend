import {Module, forwardRef} from '@nestjs/common';
import {SecondDoseService} from './second-dose.service';
import {SecondDoseController} from './second-dose.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {SecondDose} from './entities/second-dose.entity';
import {UserModule} from './../user/user.module';
import {AuthModule} from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([SecondDose]),
  ],
  controllers: [SecondDoseController],
  providers: [SecondDoseService],
})
export class SecondDoseModule {}
