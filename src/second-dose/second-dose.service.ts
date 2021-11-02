import { Injectable } from '@nestjs/common';
import { CreateSecondDoseDto } from './dto/create-second-dose.dto';
import { UpdateSecondDoseDto } from './dto/update-second-dose.dto';

@Injectable()
export class SecondDoseService {
  create(createSecondDoseDto: CreateSecondDoseDto) {
    return 'This action adds a new secondDose';
  }

  findAll() {
    return `This action returns all secondDose`;
  }

  findOne(id: number) {
    return `This action returns a #${id} secondDose`;
  }

  update(id: number, updateSecondDoseDto: UpdateSecondDoseDto) {
    return `This action updates a #${id} secondDose`;
  }

  remove(id: number) {
    return `This action removes a #${id} secondDose`;
  }
}
