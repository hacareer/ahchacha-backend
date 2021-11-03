import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import verifyKakao from 'src/auth/util/kakao';
import { AuthService } from './../auth/auth.service';

@Injectable()
export class UserService {
  async findUserByEmail(user_email: string): Promise<User | undefined> {
    const user = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.user_email = :user_email', { user_email })
      .getOne();
    return user;
  }

  async findUserById(user_no: number): Promise<User | undefined> {
    const user = await getConnection()
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.user_no = :user_no', { user_no })
      .getOne();
    return user;
  }
}
