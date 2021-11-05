import {Module} from '@nestjs/common';
import {CheckUpService} from './check-up.service';
import {CheckUpController} from './check-up.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CheckUp} from './entities/check-up.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CheckUp])],
  controllers: [CheckUpController],
  providers: [CheckUpService],
})
export class CheckUpModule {}
