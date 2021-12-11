import {Injectable, BadRequestException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as CryptoJS from 'crypto-js';
import {Repository} from 'typeorm';
import {UserService} from './../user/user.service';
import {User} from 'src/user/entities/user.entity';
import {KakaoUserDto} from 'src/user/dto/kakao-user.dto';
import {HttpService} from '@nestjs/axios';
import {catchError, lastValueFrom, map} from 'rxjs';
import {InjectRepository} from '@nestjs/typeorm';
import {LocationService} from './../location/location.service';
import {Univ} from './../univ/entities/univ.entity';
import {Err} from './../error';
import {CreateUserDto} from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Univ)
    private readonly univRepository: Repository<Univ>,
    private userService: UserService,
    private jwtService: JwtService,
    private httpService: HttpService,
    private locationService: LocationService,
  ) {}

  async createAccessToken(user: User) {
    const existingUser = await this.userRepository.findOne({
      where: {
        id: user.id,
      },
    });
    if (!existingUser) {
      throw new BadRequestException(Err.USER.NOT_FOUND);
    }
    const payload = {
      id: user.id,
      nickname: user.nickname,
      type: 'accessToken',
    };
    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
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
      expiresIn: '20700m',
    });
    const tokenVerify = await this.tokenValidate(token);
    const tokenExp = new Date(tokenVerify['exp'] * 1000);

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
    return {refreshToken, tokenExp};
  }

  async reissueRefreshToken(user: User) {
    const existingUser = await this.userRepository.findOne({
      where: {
        id: user.id,
      },
    });
    if (!existingUser) {
      throw new BadRequestException(Err.USER.NOT_FOUND);
    }
    const payload = {
      id: user.id,
      nickname: user.nickname,
      type: 'refreshToken',
    };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '20700m',
    });
    const tokenVerify = await this.tokenValidate(token);
    const tokenExp = new Date(tokenVerify['exp'] * 1000);
    const current_time = new Date();
    const time_remaining = Math.floor(
      (tokenExp.getTime() - current_time.getTime()) / 1000 / 60 / 60,
    );

    if (time_remaining > 10) {
      throw new BadRequestException(Err.TOKEN.JWT_NOT_REISSUED);
    }

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
    const access_token = await this.createAccessToken(user);
    return {access_token, refresh_token: {refreshToken, tokenExp}};
  }

  onceToken(kakaoId: string) {
    const payload = {
      id: kakaoId,
      type: 'onceToken',
    };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });
  }

  async tokenValidate(token: string) {
    return await this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  }

  async getKakaoId(kakaoUserDto: KakaoUserDto) {
    const token = kakaoUserDto.kakaoToken;
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
        catchError(() => {
          throw new BadRequestException(Err.TOKEN.INVALID_TOKEN);
        }),
      ),
    );
  }

  async validateUser(kakaoUserDto: KakaoUserDto) {
    const kakaoId = await this.getKakaoId(kakaoUserDto);
    const user = await this.userService.findUserByKakaoId(kakaoId.toString());
    // 유저가 없을때
    if (user === null) {
      const once_token = this.onceToken(kakaoId);
      return {
        type: 'once',
        once_token,
      };
    }

    // 유저가 있을때
    const access_token = await this.createAccessToken(user);
    const refresh_token = await this.createRefreshToken(user);
    return {
      type: 'login',
      access_token,
      refresh_token,
    };
  }

  async registUser(user, createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: {
        kakaoAccount: user.id,
      },
    });
    if (existingUser) {
      throw new BadRequestException(Err.USER.EXISTING_USER);
    }
    try {
      const {id, type} = user;
      const {nickname, vaccination, univId, address, deviceId} = createUserDto;
      // 1회용 토큰인경우
      if (type === 'onceToken') {
        const user = new User();
        user.kakaoAccount = id;
        user.nickname = nickname;
        user.vaccination = vaccination;
        user.deviceId = deviceId;
        if (univId) {
          const univ = await this.univRepository.findOne({
            where: {
              id: univId,
            },
          });
          user.univ = univ;
        }
        const lat = null;
        const lng = null;
        const createdUser = await this.userRepository.save(user);
        if (address) {
          const location = await this.locationService.create(createdUser.id, {
            address,
            lat,
            lng,
          });
          user.location = location;
        }
        const access_token = await this.createAccessToken(createdUser);
        const refresh_token = await this.createRefreshToken(createdUser);
        return {
          access_token,
          refresh_token,
        };
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  }
}
