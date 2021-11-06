import {Injectable} from '@nestjs/common';
import {CreateCheckUpResultDto} from './dto/create-check-up-result.dto';
import {UpdateCheckUpResultDto} from './dto/update-check-up-result.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {CheckUpResult} from './entities/check-up-result.entity';
import {Repository} from 'typeorm';
import {User} from 'src/user/entities/user.entity';
import {Clinic} from 'src/clinic/entities/clinic.entity';

@Injectable()
export class CheckUpResultService {
  constructor(
    @InjectRepository(CheckUpResult)
    private readonly checkUpResultRepository: Repository<CheckUpResult>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Clinic)
    private readonly clinicRepository: Repository<Clinic>,
  ) {}

  async create(user: User, createCheckUpResultDto: CreateCheckUpResultDto) {
    const existingUser = await this.userRepository.findOne({
      where: {
        id: user.id,
      },
    });
    // TODO 한국시간으로 저장된는지 확인
    const endTime = new Date(createCheckUpResultDto.startTime);
    endTime.setDate(endTime.getDate() + 2);
    await this.checkUpResultRepository.save({
      startTime: createCheckUpResultDto.startTime,
      endTime: endTime,
      user: existingUser,
    });
  }

  // TODO query string 안 받고 그냥 넘길지 의논
  async searchCheckUpResultByDate(id: number, from: string, to: string) {
    const user = await this.userRepository.findOne(id);
    return await this.checkUpResultRepository.find({where: user});
  }
}
