import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import CryptoJS from 'crypto-js';
import { getConnection } from 'typeorm';
import { UserService } from './../user/user.service';
import { User } from 'src/user/entities/user.entity';
import verifyKakao from './util/kakao';
import {KakaoUserDto} from 'src/user/dto/kakao-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateKakao(kakaoUserDto: KakaoUserDto) {
    const payload = await verifyKakao(kakaoUserDto.idToken);

    if (payload.email_verified !== true) {
      // TODO error 정의
    }

    // TODO USER 데이터 정의

    const user = await this.validateUser(user_email);
    if (user === null) {
      // 유저가 없을때
      console.log('일회용 토큰 발급');
      const once_token = this.onceToken(user_profile);
      return { once_token, type: 'once' };
    }

    // 유저가 있을때
    console.log('로그인 토큰 발급');
    const access_token = await this.createLoginToken(user);
    const refresh_token = await this.createRefreshToken(user);
    return { access_token, refresh_token, type: 'login' };
  }

  async validateUser(user_email: string): Promise<any> {
    const user = await this.userService.findUserByEmail(user_email);
    if (!user) {
      return null;
    }
    return user;
  }

  async createLoginToken(user: User) {
    const payload = {
      user_no: user.user_no,
      user_token: 'loginToken',
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '6m',
    });
  }

  async createRefreshToken(user: User) {
    const payload = {
      user_no: user.user_no,
      user_token: 'refreshToken',
    };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '50m',
    });

    const refresh_token = CryptoJS.AES.encrypt(
      JSON.stringify(token),
      process.env.AES_KEY,
    ).toString();

    await getConnection()
      .createQueryBuilder()
      .update(User)
      //      .set({ user_refresh_token: token })
      .where(`user_no = ${user.user_no}`)
      .execute();
    return refresh_token;
  }

  onceToken(user_profile: any) {
    const payload = {
      user_email: user_profile.user_email,
      user_nick: user_profile.user_nick,
      user_provider: user_profile.user_provider,
      user_token: 'onceToken',
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '10m',
    });
  }

  async tokenValidate(token: string) {
    return await this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
