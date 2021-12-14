import {Injectable, BadRequestException} from '@nestjs/common';
import {getManager, Repository} from 'typeorm';
import {Clinic} from './entities/clinic.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Err} from './../error';

@Injectable()
export class ClinicService {
  constructor(
    @InjectRepository(Clinic)
    private readonly clinicRepository: Repository<Clinic>,
  ) {}

  async findByName(word) {
    return await this.clinicRepository
      .createQueryBuilder('clinic')
      .innerJoinAndSelect('clinic.operationHour', 'operationHour')
      .where('clinic.name like :name', {name: `${word}%`})
      .getMany();
  }

  async findNearBy5Km(lat, lng) {
    const entityManager = getManager();
    return await entityManager.query(
      `
      SELECT *,
        (6371*acos(cos(radians(${lat}))*cos(radians(latitude))*cos(radians(longitude)
        -radians(${lng}))+sin(radians(${lat}))*sin(radians(latitude))))
      AS distance
      FROM path_finder.clinic
      HAVING distance <= 5
      ORDER BY distance 
      LIMIT 0,5000
    `,
    );
  }

  async findOne(clinicId: number) {
    const existingClinic = await this.clinicRepository.findOne({
      where: {
        id: clinicId,
      },
      relations: ['operationHour'],
    });
    if (!existingClinic) {
      throw new BadRequestException(Err.CLINIC.NOT_FOUND);
    }
    return existingClinic;
  }
}
