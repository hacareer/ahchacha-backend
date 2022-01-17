import {Injectable, BadRequestException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as CryptoJS from 'crypto-js';
import {Repository} from 'typeorm';
import {UserService} from './../user/user.service';
import {HttpService} from '@nestjs/axios';
import {catchError, lastValueFrom, map} from 'rxjs';
import {InjectRepository} from '@nestjs/typeorm';
import {LocationService} from './../location/location.service';
import {Univ} from './../univ/entities/univ.entity';
import {Err} from '../common/error';
import {User} from './../user/entities/user.entity';
import {SignInDto} from '../user/dto/sign-in.dto';
import {SignUpDto} from './../user/dto/sign-up.dto';
import {ConfigService} from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Univ)
    private readonly univRepository: Repository<Univ>,
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
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
      type: 'login_token',
    };
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get('auth').accessTokenExp,
    });
  }

  async createRefreshToken(user: User) {
    const payload = {
      id: user.id,
      nickname: user.nickname,
      type: 'login_token',
    };
    const token = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('auth').refreshTokenExp,
    });
    const tokenVerify = await this.tokenValidate(token);
    const tokenExp = new Date(tokenVerify['exp'] * 1000);

    const refresh_token = CryptoJS.AES.encrypt(
      JSON.stringify(token),
      this.configService.get('auth').aes_key,
    ).toString();

    await await this.userRepository
      .createQueryBuilder('user')
      .update()
      .set({refreshToken: refresh_token})
      .where('user.id = :id', {id: user.id})
      .execute();
    return {refresh_token, tokenExp};
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
      type: 'login_token',
    };
    const token = this.jwtService.sign(payload, {
      expiresIn: this.configService.get('auth').refreshTokenExp,
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

    const refresh_token = CryptoJS.AES.encrypt(
      JSON.stringify(token),
      this.configService.get('auth').aes_key,
    ).toString();

    await await this.userRepository
      .createQueryBuilder('user')
      .update()
      .set({refreshToken: refresh_token})
      .where('user.id = :id', {id: user.id})
      .execute();
    const access_token = await this.createAccessToken(user);
    return {access_token, refresh_token: {refresh_token, tokenExp}};
  }

  onceToken(kakaoId: string) {
    const payload = {
      id: kakaoId,
      type: 'once_token',
    };

    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get('auth').accessTokenExp,
    });
  }

  async tokenValidate(token: string) {
    return await this.jwtService.verify(token);
  }

  async getKakaoId(signInDto: SignInDto) {
    const token = signInDto.kakaoToken;
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
          throw new BadRequestException(Err.KAKAO.INVALID_TOKEN);
        }),
      ),
    );
  }

  async signIn(signInDto: SignInDto) {
    const kakaoId = await this.getKakaoId(signInDto);
    console.log(kakaoId);
    const user = await this.userService.findUserByKakaoId(kakaoId.toString());
    // 유저가 없을때
    if (user === null) {
      const once_token = this.onceToken(kakaoId);
      return {
        type: 'once_token',
        once_token,
      };
    }

    // 유저가 있을때
    const access_token = await this.createAccessToken(user);
    const refresh_token = await this.createRefreshToken(user);
    return {
      type: 'login_token',
      access_token,
      refresh_token,
    };
  }

  async signUp(user: any, singUpDto: SignUpDto) {
    const {id, type} = user;
    const {nickname, vaccination, univId, address, deviceId} = singUpDto;
    if (type === 'login_token') {
      throw new BadRequestException(Err.USER.EXISTING_USER);
    }
    // 1회용 토큰인경우
    if (type === 'once_token') {
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
      const latitude = null;
      const longitude = null;
      const createdUser = await this.userRepository.save(user);
      if (address) {
        const location = await this.locationService.createLocation(
          createdUser.id,
          {
            address,
            latitude,
            longitude,
          },
        );
        user.location = location;
      }
      const access_token = await this.createAccessToken(createdUser);
      const refresh_token = await this.createRefreshToken(createdUser);
      return {
        access_token,
        refresh_token,
      };
    }
  }
}
