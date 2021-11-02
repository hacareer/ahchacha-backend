import { Module } from '@nestjs/common';
import { UnivService } from './univ.service';
import { UnivController } from './univ.controller';

@Module({
  controllers: [UnivController],
  providers: [UnivService],
})
export class UnivModule {}
