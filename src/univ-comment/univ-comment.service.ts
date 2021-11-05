import { Injectable } from '@nestjs/common';
import { CreateUnivCommentDto } from './dto/create-univ-comment.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class UnivCommentService {
  create(user: User, createUnivCommentDto: CreateUnivCommentDto) {
    return 'This action adds a new univComment';
  }

  findByUniv() {
    return `This action returns all univComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} univComment`;
  }
}
