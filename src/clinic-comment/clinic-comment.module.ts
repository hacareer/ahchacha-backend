import {Module, forwardRef} from '@nestjs/common';
import {ClinicCommentService} from './clinic-comment.service';
import {ClinicCommentController} from './clinic-comment.controller';
import {UserModule} from './../user/user.module';
import {AuthModule} from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => AuthModule)],
  controllers: [ClinicCommentController],
  providers: [ClinicCommentService],
})
export class ClinicCommentModule {}
