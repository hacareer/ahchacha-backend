import {BadRequestException, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {Univ} from './../univ/entities/univ.entity';
import {Err} from './../error';
import {UpdateMyInfoDto} from './dto/update-my-info.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Univ)
    private readonly univRepository: Repository<Univ>,
  ) {}

  async findUserByKakaoId(kakaoId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        kakaoAccount: kakaoId,
      },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  async findUserById(id: number) {
    const existingUser = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!existingUser) {
      throw new BadRequestException(Err.USER.NOT_FOUND);
    }
    return existingUser;
  }

  async getMyInfo(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['location', 'univ'],
    });
    return user;
  }

  async checkUserBynickname(nickname: string) {
    const user = await this.userRepository.findOne({
      where: {
        nickname,
      },
    });
    return '닉네임 사용 가능합니다';
  }

  async updateMyInfo(id: number, updateMyInfoDto: UpdateMyInfoDto) {
    if (updateMyInfoDto.univId) {
      const univ = await this.univRepository.findOne({
        where: {
          id: updateMyInfoDto.univId,
        },
      });
      await this.userRepository.update(id, {univ});
    }
    if (updateMyInfoDto.nickname) {
      await this.userRepository.update(id, {
        nickname: updateMyInfoDto.nickname,
      });
    }
    return 'Record successfully updated';
  }
}
