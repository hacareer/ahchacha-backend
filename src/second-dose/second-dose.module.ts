import { Module } from '@nestjs/common';
import { SecondDoseService } from './second-dose.service';
import { SecondDoseController } from './second-dose.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecondDose } from './entities/second-dose.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SecondDose])],
  controllers: [SecondDoseController],
  providers: [SecondDoseService],
})
export class SecondDoseModule {}
