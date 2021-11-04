import { Injectable } from '@nestjs/common';
import { CreateClinicCommentDto } from './dto/create-clinic-comment.dto';
import { UpdateClinicCommentDto } from './dto/update-clinic-comment.dto';

@Injectable()
export class ClinicCommentService {
  create(createClinicCommentDto: CreateClinicCommentDto) {
    return 'This action adds a new clinicComment';
  }

  findAll() {
    return `This action returns all clinicComment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clinicComment`;
  }

  update(id: number, updateClinicCommentDto: UpdateClinicCommentDto) {
    return `This action updates a #${id} clinicComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} clinicComment`;
  }
}
