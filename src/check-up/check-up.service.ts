import {Injectable} from '@nestjs/common';
import {CreateCheckUpDto} from './dto/create-check-up.dto';
import {UpdateCheckUpDto} from './dto/update-check-up.dto';

@Injectable()
export class CheckUpService {
  create(createCheckUpDto: CreateCheckUpDto) {
    return 'This action adds a new checkUp';
  }

  findAll() {
    return `This action returns all checkUp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkUp`;
  }

  update(id: number, updateCheckUpDto: UpdateCheckUpDto) {
    return `This action updates a #${id} checkUp`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkUp`;
  }
}
