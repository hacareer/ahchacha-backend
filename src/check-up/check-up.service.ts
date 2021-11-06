import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Clinic} from 'src/clinic/entities/clinic.entity';
import {User} from 'src/user/entities/user.entity';
import {Repository} from 'typeorm';
import {CreateCheckUpDto} from './dto/create-check-up.dto';
import {UpdateCheckUpDto} from './dto/update-check-up.dto';
import {CheckUp} from './entities/check-up.entity';

@Injectable()
export class CheckUpService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(CheckUp)
    private readonly checkUpRepository: Repository<CheckUp>,
    @InjectRepository(Clinic)
    private readonly clinicRepository: Repository<Clinic>,
  ) {}

  async create(user, createCheckUpDto: CreateCheckUpDto) {
    const existingUser = await this.userRepository.findOne({id: user.id});
    const existingClinic = await this.clinicRepository.findOne(
      createCheckUpDto.clinicid,
    );
    // TODO 한국시간으로 저장 / 보내주는지 확인
    return await this.checkUpRepository.save({
      day: createCheckUpDto.day,
      clinic: existingClinic,
      user: existingUser,
    });
  }

  async findAll(userId) {
    const existingUser = await this.userRepository.findOne({id: userId});
    return await this.checkUpRepository.find({where: {user: existingUser}});
  }

  async findOne(userId, checkupId) {
    const existingUser = await this.userRepository.findOne({id: userId});
    return await this.checkUpRepository.findOne({
      where: {
        user: existingUser,
        id: checkupId,
      },
    });
  }

  async update(userId, checkupId, updateCheckUpDto: UpdateCheckUpDto) {
    // TODO 로직 다시 짜기
    if (updateCheckUpDto.clinicid) {
      const existingClinic = await this.clinicRepository.findOne(
        updateCheckUpDto.clinicid,
      );
      await this.checkUpRepository.update(
        {id: checkupId},
        {clinic: existingClinic},
      );
    }
    if (updateCheckUpDto.day) {
      const existingClinic = await this.clinicRepository.findOne(
        updateCheckUpDto.clinicid,
      );
      await this.checkUpRepository.update(
        {id: checkupId},
        {day: updateCheckUpDto.day},
      );
    }
    return await this.checkUpRepository.findOne({
      where: {
        id: checkupId,
      },
    });
  }

  async remove(userId, checkupId) {
    return await this.checkUpRepository.delete({id: checkupId});
  }
}
