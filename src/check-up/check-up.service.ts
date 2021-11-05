import { Injectable } from '@nestjs/common';
import { CreateCheckUpDto } from './dto/create-check-up.dto';
import { UpdateCheckUpDto } from './dto/update-check-up.dto';

@Injectable()
export class CheckUpService {
  create(createCheckUpDto: CreateCheckUpDto) {
    return 'This action adds a new checkUp';
  }S
}
