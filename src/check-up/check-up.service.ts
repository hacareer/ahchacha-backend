import {Injectable} from '@nestjs/common';
import {User} from 'src/user/entities/user.entity';
import {CreateCheckUpDto} from './dto/create-check-up.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CheckUp} from './entities/check-up.entity';
import {Clinic} from './../clinic/entities/clinic.entity';

@Injectable()
export class CheckUpService {
  constructor(
    @InjectRepository(CheckUp)
    private readonly checkUpRepository: Repository<CheckUp>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Clinic)
    private readonly clinicRepository: Repository<Clinic>,
  ) {}

  async create(user: User, createCheckUpDto: CreateCheckUpDto) {
    const clinic = await this.clinicRepository.findOne({
      where: {
        id: createCheckUpDto.clinicId,
      },
    });
    const existingUser = await this.userRepository.findOne({
      where: {
        id: user.id,
      },
    });
    const endTime = new Date(createCheckUpDto.startTime);
    endTime.setDate(endTime.getDate() + 2);
    await this.checkUpRepository.save({
      startTime: createCheckUpDto.startTime,
      endTime: endTime,
      clinic,
      user: existingUser,
    });
  }

  async searchCheckUpByDate(id: number, from: string, to: string) {
    const user = await this.userRepository.findOne(id);
    return await this.checkUpRepository.find({where: user});
  }
}
