import {BadRequestException, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {UpdateUserDto} from './dto/update-user.dto';
import {User} from './entities/user.entity';
import {Univ} from './../univ/entities/univ.entity';
import {Err} from './../error';

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

  async getLoginInfo(id: number) {
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

  async updateUserInfo(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.univId) {
      const univ = await this.univRepository.findOne({
        where: {
          id: updateUserDto.univId,
        },
      });
      await this.userRepository.update(id, {univ});
    }
    if (updateUserDto.nickname) {
      await this.userRepository.update(id, {
        nickname: updateUserDto.nickname,
      });
    }
    return 'Record successfully updated';
  }
}
