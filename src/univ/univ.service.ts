import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from 'src/user/entities/user.entity';
import {Repository} from 'typeorm';
import {CreateUnivDto} from './dto/create-univ.dto';
import {Univ} from './entities/univ.entity';

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
    return await this.univRepository.findOne({id: univId});
  }
}
