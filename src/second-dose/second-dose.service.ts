import {Injectable, BadRequestException} from '@nestjs/common';
import {User} from 'src/user/entities/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {SecondDose} from './entities/second-dose.entity';
import {Univ} from './../univ/entities/univ.entity';
import {Err} from 'src/error';

@Injectable()
export class SecondDoseService {
  constructor(
    @InjectRepository(SecondDose)
    private readonly secondDoseRepository: Repository<SecondDose>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Univ)
    private readonly univRepository: Repository<Univ>,
  ) {}

  async create(userId: number) {
    const existingUser = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!existingUser) {
      return null;
    }
    return await this.secondDoseRepository.save({user: existingUser});
  }

  async countByUniv(univId: number, from: string, to: string) {
    const existingUniv = await this.univRepository.findOne({
      where: {
        id: univId,
      },
    });
    if (!existingUniv) {
      throw new BadRequestException(Err.UNIV.NOT_FOUND);
    }
    const number = await this.secondDoseRepository
      .createQueryBuilder('secondDose')
      .innerJoin('secondDose.user', 'user')
      .where('user.univId = :univId', {univId})
      .andWhere(
        `secondDose.createdAt 
      BETWEEN '${from}' AND '${to}'`,
      )
      .getCount();
    return {number};
  }
}
