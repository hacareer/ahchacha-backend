import {Module, forwardRef} from '@nestjs/common';
import {SecondDoseService} from './second-dose.service';
import {SecondDoseController} from './second-dose.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {SecondDose} from './entities/second-dose.entity';
import {UserModule} from './../user/user.module';
import {Univ} from './../univ/entities/univ.entity';
import {AuthModule} from './../auth/auth.module';
import {User} from './../user/entities/user.entity';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([SecondDose, User, Univ]),
  ],
  controllers: [SecondDoseController],
  providers: [SecondDoseService],
})
export class SecondDoseModule {}
