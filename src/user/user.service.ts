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

  async findUserByKakaoId(kakaoId: string): Promise<User | undefined> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select('user')
      .where('user.kakaoAccount = :kakaoId', { kakaoId })
      .getOne();
    return user;
  }

  async findUserById(id: number): Promise<User | undefined> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select('user')
      .where('user.id = :id', { id })
      .getOne();
    return user;
  }
}
