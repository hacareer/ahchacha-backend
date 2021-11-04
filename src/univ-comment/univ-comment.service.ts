import { Injectable } from '@nestjs/common';
import { CreateUnivCommentDto } from './dto/create-univ-comment.dto';
import { UpdateUnivCommentDto } from './dto/update-univ-comment.dto';

@Injectable()
export class UnivCommentService {
  create(createUnivCommentDto: CreateUnivCommentDto) {
    return 'This action adds a new univComment';
  }

  findAll() {
    return `This action returns all univComment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} univComment`;
  }

  update(id: number, updateUnivCommentDto: UpdateUnivCommentDto) {
    return `This action updates a #${id} univComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} univComment`;
  }
}
