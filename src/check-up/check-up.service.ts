import {Injectable, BadRequestException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Clinic} from 'src/clinic/entities/clinic.entity';
import {User} from 'src/user/entities/user.entity';
import {Repository} from 'typeorm';
import {CreateCheckUpDto} from './dto/create-check-up.dto';
import {CheckUp} from './entities/check-up.entity';
import {Err} from '../common/error';
import {UpdateCheckUpDto} from './dto/update-check-up.dto';

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

  async createCheckUp(userId, createCheckUpDto: CreateCheckUpDto) {
    const user = await this.userRepository.findOne({id: userId});
    const existingClinic = await this.clinicRepository.findOne(
      createCheckUpDto.clinicId,
    );
    return await this.checkUpRepository.save({
      date: createCheckUpDto.date,
      clinic: existingClinic,
      user,
    });
  }

  async findMyCheckUp(userId: number) {
    const user = await this.userRepository.findOne({id: userId});
    return await this.checkUpRepository.find({
      where: {user},
      relations: ['clinic'],
      order: {date: 'ASC'},
    });
  }

  async findCheckUpbyId(checkupId: number) {
    const existingCheckUp = await this.checkUpRepository.findOne({
      where: {
        id: checkupId,
      },
      relations: ['clinic'],
    });
    if (!existingCheckUp) {
      throw new BadRequestException(Err.CHECK_UP.NOT_FOUND);
    }
  }

  async updateCheckUp(checkUpId, updateCheckUpDto: UpdateCheckUpDto) {
    // TODO 로직 다시 짜기
    const existingClinic = await this.clinicRepository.findOne(
      updateCheckUpDto.clinicId,
    );
    if (!existingClinic) {
      throw new BadRequestException(Err.CLINIC.NOT_FOUND);
    }
    const existingCheckUp = await this.checkUpRepository.findOne({
      where: {
        id: checkUpId,
      },
    });
    if (!existingCheckUp) {
      throw new BadRequestException(Err.CHECK_UP.NOT_FOUND);
    }
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
    return 'Record successfully updated';
  }

  async deleteCheckUp(checkUpId) {
    const existingCheckUp = await this.checkUpRepository.findOne({
      where: {
        id: checkUpId,
      },
    });
    if (!existingCheckUp) {
      throw new BadRequestException(Err.CHECK_UP.NOT_FOUND);
    }
    await this.checkUpRepository.delete({id: checkUpId});
    return 'Record successfully deleted';
  }
}
