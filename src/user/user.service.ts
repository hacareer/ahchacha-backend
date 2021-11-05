import { Injectable } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
    return user;
  }

  async findUserBynickname(nickname: string) {
    const user = await this.userRepository.findOne({
      where: {
        nickname,
      },
    });
    if (!user) {
    }
    return user;
  }
}
