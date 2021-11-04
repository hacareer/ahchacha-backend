import {Injectable} from '@nestjs/common';
import {CreateClinicDto} from './dto/create-clinic.dto';
import {UpdateClinicDto} from './dto/update-clinic.dto';
import {getManager} from 'typeorm';

@Injectable()
export class ClinicService {
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

  findAll() {
    return `This action returns all clinic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clinic`;
  }

  update(id: number, updateClinicDto: UpdateClinicDto) {
    return `This action updates a #${id} clinic`;
  }
}
