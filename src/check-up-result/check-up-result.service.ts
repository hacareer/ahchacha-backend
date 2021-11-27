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

  async create(userId: number, createCheckUpResultDto: CreateCheckUpResultDto) {
    const existingUser = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    const finishTime = new Date(createCheckUpResultDto.startTime);
    finishTime.setDate(finishTime.getDate() + 2);
    return await this.checkUpResultRepository.save({
      startTime: createCheckUpResultDto.startTime,
      finishTime,
      user: existingUser,
    });
  }

  // TODO query string 안 받고 그냥 넘길지 의논
  async searchCheckUpResultByDate(userId: number, from: string, to: string) {
    if (from === undefined) {
      from = '1800-01-01 00:00';
    }
    if (to === undefined) {
      to = '2800-01-01 00:00';
    }
    const existingUser = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    return await this.checkUpResultRepository
      .createQueryBuilder('checkUpResult')
      .innerJoin('checkUpResult.user', 'user')
      .where('user.id =:userId', {userId: existingUser.id})
      .andWhere(
        `checkUpResult.startTime 
      BETWEEN '${from}' AND '${to}'`,
      )
      .getMany();
  }
}
