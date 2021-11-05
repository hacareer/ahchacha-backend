import {Module, forwardRef} from '@nestjs/common';
import {LocationService} from './location.service';
import {LocationController} from './location.controller';
import {HttpModule} from '@nestjs/axios';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Location} from './entities/location.entity';
import {User} from './../user/entities/user.entity';
import {UserModule} from './../user/user.module';
import {AuthModule} from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    HttpModule,
    TypeOrmModule.forFeature([Location, User]),
  ],
  controllers: [LocationController],
  providers: [LocationService],
  exports: [LocationService],
})
export class LocationModule {}
