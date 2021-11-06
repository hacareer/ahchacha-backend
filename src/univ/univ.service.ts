import {Injectable} from '@nestjs/common';
import {CreateUnivDto} from './dto/create-univ.dto';

@Injectable()
export class UnivService {
  findAll() {
    return `This action returns all univ`;
  }

  findOne(id: number) {
    return `This action returns a #${id} univ`;
  }
}
