import {BadRequestException, Injectable} from '@nestjs/common';
import {Repository} from 'typeorm';
import {User} from 'src/user/entities/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Err} from 'src/error';
import {Univ} from 'src/univ/entities/univ.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Univ)
    private readonly univRepository: Repository<Univ>,
  ) {}

  async findUserByKakaoId(kakaoId: string) {
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
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new BadRequestException(Err.USER.NOT_FOUND);
    }
    return user;
  }

  async getLoginInfo(userId: number) {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: ['location', 'univ'],
    });
    if (!user) {
      throw new BadRequestException(Err.USER.NOT_FOUND);
    }
    return user;
  }

  async checkUserBynickname(nickname: string) {
    const user = await this.userRepository.findOne({
      where: {
        nickname,
      },
    });
    if (user) {
      throw new BadRequestException(Err.USER.EXISTING_USER_NICKNAME);
    }
    return '닉네임 사용 가능합니다';
  }

  async updateUnivInfo(userId: number, univId: number) {
    const univ = await this.univRepository.findOne({
      where: {
        id: univId,
      },
    });
    await this.userRepository.update(userId, {univ});
    return 'update success';
  }
}
