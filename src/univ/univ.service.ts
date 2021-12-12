import {Injectable, BadRequestException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Univ} from './entities/univ.entity';
import {Err} from 'src/error';

@Injectable()
export class UnivService {
  constructor(
    @InjectRepository(Univ)
    private readonly univRepository: Repository<Univ>,
  ) {}

  async findAll() {
    return await this.univRepository.find();
  }

  async findByName(word) {
    return await this.univRepository
      .createQueryBuilder('univ')
      .where('univ.name like :name', {name: `${word}%`})
      .getMany();
  }

  async findByUnivId(univId: number) {
    const existingUniv = await this.univRepository.findOne({
      where: {
        id: univId,
      },
    });
    if (!existingUniv) {
      throw new BadRequestException(Err.UNIV.NOT_FOUND);
    }
    return await this.univRepository.findOne({id: univId});
  }
}
