import { Injectable } from '@nestjs/common';
import { getManager, Repository } from 'typeorm';
import { Clinic } from './entities/clinic.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClinicService {
  constructor(
    @InjectRepository(Clinic)
    private readonly clinicRepository: Repository<Clinic>,
  ) {}

  async findNear(lat, lng) {
    console.log(lat, lng);
    const entityManager = getManager();
    return await entityManager.query(
      `
      SELECT *,
        (6371*acos(cos(radians(${lat}))*cos(radians(latitude))*cos(radians(longitude)
        -radians(${lng}))+sin(radians(${lat}))*sin(radians(latitude))))
      AS distance
      FROM path_finder.clinic
      HAVING distance <= 1
      ORDER BY distance 
      LIMIT 0,1000
    `,
    );
  }

  async findOne(id: number) {
    return await this.clinicRepository.findOne({
      where: {
        id,
      },
    });
  }
}
