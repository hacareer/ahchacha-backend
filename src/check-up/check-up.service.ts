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
      createCheckUpDto.clinicId,
    );
    return await this.checkUpRepository.save({
      date: createCheckUpDto.date,
      clinic: existingClinic,
      user: existingUser,
    });
  }

  async findAll(userId: number) {
    const existingUser = await this.userRepository.findOne({id: userId});
    return await this.checkUpRepository.find({
      where: {user: existingUser},
      relations: ['clinic'],
      order: {date: 'ASC'},
    });
  }

  async findOne(checkupId: number) {
    return await this.checkUpRepository.findOne({
      where: {
        id: checkupId,
      },
      relations: ['clinic'],
    });
  }

  async update(checkUpId, updateCheckUpDto: UpdateCheckUpDto) {
    // TODO 로직 다시 짜기
    const existingClinic = await this.clinicRepository.findOne(
      updateCheckUpDto.clinicId,
    );
    if (updateCheckUpDto.clinicId) {
      await this.checkUpRepository.update(
        {id: checkUpId},
        {clinic: existingClinic},
      );
    }
    if (updateCheckUpDto.date) {
      await this.checkUpRepository.update(
        {id: checkUpId},
        {date: updateCheckUpDto.date},
      );
    }
    return await this.checkUpRepository.findOne({
      where: {
        id: checkUpId,
      },
      relations: ['clinic'],
    });
  }

  async remove(checkupId) {
    await this.checkUpRepository.delete({id: checkupId});
    return 'delete success';
  }
}
