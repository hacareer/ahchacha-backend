import { Module } from '@nestjs/common';
import { SecondDoseService } from './second-dose.service';
import { SecondDoseController } from './second-dose.controller';

@Module({
  controllers: [SecondDoseController],
  providers: [SecondDoseService],
})
export class SecondDoseModule {}
