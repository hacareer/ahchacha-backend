import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SecondDose } from './entities/second-dose.entity';

@Injectable()
export class SecondDoseService {
  constructor(
    @InjectRepository(SecondDose)
    private readonly secondDoseRepository: Repository<SecondDose>,
  ) {}

  async create(user: User) {
    return await this.secondDoseRepository.save({ user });
  }

  async countByUniv(univId: number, from: string, to: string) {
    const secondDoseNumber = await this.secondDoseRepository
      .createQueryBuilder('secondDose')
      .innerJoin('secondDose.user', 'user')
      .innerJoin('user.univId', 'secondDose')
      .where('user.univId = :univId', { univId })
      .andWhere(
        `secondDose.createdAt 
      BETWEEN '${from}' AND '${to}'`,
      )
      .getCount();
    return secondDoseNumber;
  }
}
