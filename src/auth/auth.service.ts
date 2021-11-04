import {ConsoleLogger, Injectable} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as CryptoJS from 'crypto-js';
import {Repository} from 'typeorm';
import {UserService} from './../user/user.service';
import {User} from 'src/user/entities/user.entity';
import {KakaoUserDto} from 'src/user/dto/kakao-user.dto';
import {HttpService} from '@nestjs/axios';
import {lastValueFrom, map} from 'rxjs';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
    private httpService: HttpService,
  ) { }

  async createLoginToken(user: User) {
    const payload = {
      id: user.id,
      nickname: user.nickname,
      type: 'accessToken',
    };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '6m',
    });
  }

  async createRefreshToken(user: User) {
    const payload = {
      id: user.id,
      nickname: user.nickname,
      type: 'refreshToken',
    };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '50m',
    });

    const refreshToken = CryptoJS.AES.encrypt(
      JSON.stringify(token),
      process.env.AES_KEY,
    ).toString();

    await await this.userRepository
      .createQueryBuilder('user')
      .update()
      .set({refreshToken})
      .where('user.id = :id', {id: user.id})
      .execute();
    return refreshToken;
  }

  onceToken(kakaoId: string) {
    const payload = {
      id: kakaoId,
      type: 'onceToken',
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

  async getKakaoId(kakaoUserDto: KakaoUserDto) {
    const token = kakaoUserDto.idToken;
    const _url = 'https://kapi.kakao.com/v2/user/me';
    const _header = {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      Authorization: `Bearer ${token}`,
    };
    return await lastValueFrom(
      this.httpService.post(_url, '', {headers: _header}).pipe(
        map((response) => {
          return response.data.id;
        }),
      ),
    );
  }

  async validateUser(kakaoUserDto: KakaoUserDto) {
    const kakaoId = await this.getKakaoId(kakaoUserDto);

    // TODO kakaoId 없는 경우 에러

    const user = await this.userService.findUserByKakaoId(kakaoId.toString());

    if (user === null) {
      // 유저가 없을때
      console.log('일회용 토큰 발급');
      const once_token = this.onceToken(kakaoId);
      return {
        success: true,
        message: '일회용 토큰 정상 발급',
        data: {
          type: 'once',
          once_token,
        },
      };
    }

    // 유저가 있을때
    console.log('로그인 토큰 발급');
    const access_token = await this.createLoginToken(user);
    const refresh_token = await this.createRefreshToken(user);
    return {
      success: true,
      message: '사용자 정상 로그인',
      data: {
        type: 'login',
        access_token,
        refresh_token,
      },
    };
  }

  async registUser(req, createUserDto) {
    try {
      const {id, type} = req.user;
      const {nickname, vaccination, univId, location} = createUserDto;
      // 1회용 토큰인경우
      if (type === 'onceToken') {
        const univ = await this.userRepository.findOne({
          where: {
            id: univId,
          },
        });
        // geocoder 위도 경도 변환
        // TODO 사용자 위치 저장 로직 추가
        await await this.userRepository
          .createQueryBuilder('user')
          .insert()
          .values({
            kakaoAccount: id,
            nickname,
            vaccination,
            univ,
            location,
          })
          .execute();
        const user = await this.userService.findUserByKakaoId(id);
        const access_token = await this.createLoginToken(user);
        const refresh_token = await this.createRefreshToken(user);

        return {
          success: true,
          message: '사용자 정상 생성',
          data: {
            access_token,
            refresh_token,
          },
        };
      }
    } catch (error) {
      console.log(error);
    }
    // 그 외의 경우
    return false;
  }
}
