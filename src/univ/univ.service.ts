import { Injectable } from '@nestjs/common';
import { CreateUnivDto } from './dto/create-univ.dto';
import { UpdateUnivDto } from './dto/update-univ.dto';

@Injectable()
export class UnivService {
  create(createUnivDto: CreateUnivDto) {
    return 'This action adds a new univ';
  }

  findAll() {
    return `This action returns all univ`;
  }

  findOne(id: number) {
    return `This action returns a #${id} univ`;
  }

  update(id: number, updateUnivDto: UpdateUnivDto) {
    return `This action updates a #${id} univ`;
  }

  remove(id: number) {
    return `This action removes a #${id} univ`;
  }
}
