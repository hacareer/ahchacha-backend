import { Module } from '@nestjs/common';
import { ClinicCommentService } from './clinic-comment.service';
import { ClinicCommentController } from './clinic-comment.controller';

@Module({
  controllers: [ClinicCommentController],
  providers: [ClinicCommentService],
})
export class ClinicCommentModule {}
