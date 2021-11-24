import {Module, forwardRef} from '@nestjs/common';
import {ClinicCommentService} from './clinic-comment.service';
import {ClinicCommentController} from './clinic-comment.controller';
import {UserModule} from './../user/user.module';
import {AuthModule} from 'src/auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from 'src/user/entities/user.entity';
import {Clinic} from 'src/clinic/entities/clinic.entity';
import {ClinicComment} from './entities/clinic-comment.entity';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, ClinicComment, Clinic]),
  ],
  controllers: [ClinicCommentController],
  providers: [ClinicCommentService],
})
export class ClinicCommentModule {}
