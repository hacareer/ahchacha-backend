import { Module } from '@nestjs/common';
import { CheckUpService } from './check-up.service';
import { CheckUpController } from './check-up.controller';

@Module({
  controllers: [CheckUpController],
  providers: [CheckUpService],
})
export class CheckUpModule {}
