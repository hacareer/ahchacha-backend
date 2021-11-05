import {Module} from '@nestjs/common';
import {UnivCommentService} from './univ-comment.service';
import {UnivCommentController} from './univ-comment.controller';

@Module({
  controllers: [UnivCommentController],
  providers: [UnivCommentService],
})
export class UnivCommentModule {}
