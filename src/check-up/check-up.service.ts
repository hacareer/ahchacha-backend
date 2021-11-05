import {Injectable} from '@nestjs/common';
import {User} from 'src/user/entities/user.entity';
import {CreateCheckUpDto} from './dto/create-check-up.dto';
import {UpdateCheckUpDto} from './dto/update-check-up.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CheckUp} from './entities/check-up.entity';

@Injectable()
export class CheckUpService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(CheckUp)
    private readonly checkUpRepository: Repository<CheckUp>,
  ) { }
  async create(user: User, createCheckUpDto: CreateCheckUpDto) {
    const checkup = new CheckUp();
    checkup.user;
    return await this.checkUpRepository.save(createCheckUpDto);
  }

  // from to query로 찾는 함수 추가
  findAll() {
    return `This action returns all checkUp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkUp`;
  }

  update(id: number, updateCheckUpDto: UpdateCheckUpDto) {
    return `This action updates a #${id} checkUp`;
  }
}
