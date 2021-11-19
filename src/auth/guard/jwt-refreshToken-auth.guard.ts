import {
  BadRequestException,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {AuthGuard} from '@nestjs/passport';
import * as CryptoJS from 'crypto-js';
import {UserService} from 'src/user/user.service';
import {AuthService} from '../auth.service';
import {Err} from './../../error';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt') {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    private userService: UserService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const {authorization} = request.headers;
    if (authorization === undefined) {
      throw new BadRequestException(Err.TOKEN.NOT_SEND_REFRESH_TOKEN);
    }

    const refreshToken = authorization.replace('Bearer ', '');
    const refreshTokenValidate = await this.validate(refreshToken);
    if (refreshTokenValidate.refreshTokenReissue) {
      response.setHeader('accessToken', refreshTokenValidate.newAccessToken);
      response.setHeader('accessTokenReissue', true);
      response.setHeader('refreshToken', refreshTokenValidate.newRefreshToken);
      response.setHeader('refreshTokenReissue', true);
    } else {
      response.setHeader('accessToken', refreshTokenValidate.newAccessToken);
      response.setHeader('accessTokenReissue', true);
      response.setHeader('refreshTokenReissue', false);
    }
    return true;
  }

  async validate(refreshToken: string) {
    try {
      let newAccessToken;
      const bytes = CryptoJS.AES.decrypt(refreshToken, process.env.AES_KEY);
      const token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      const tokenVerify = await this.authService.tokenValidate(token);
      const user = await this.userService.findUserById(tokenVerify.id);
      if (user.refreshToken === refreshToken) {
        newAccessToken = await this.authService.createAccessToken(user);
      } else {
        throw new Error('no permission');
      }
      // 토큰의 남은 시간 체크
      const tokenExp = new Date(tokenVerify['exp'] * 1000);
      const current_time = new Date();

      const time_remaining = Math.floor(
        (tokenExp.getTime() - current_time.getTime()) / 1000 / 60 / 60 / 24,
      );

      if (time_remaining < 30) {
        const newRefreshToken = await this.authService.createRefreshToken(user);
        return {
          newAccessToken,
          newRefreshToken,
          refreshTokenReissue: true,
        };
      } else {
        return {
          newAccessToken,
          refreshTokenReissue: false,
        };
      }
    } catch (error) {
      switch (error.message) {
        // 토큰에 대한 오류를 판단합니다.
        case 'invalid token':
          throw new BadRequestException(Err.TOKEN.INVALID_TOKEN);

        case 'no permission':
          throw new BadRequestException(Err.TOKEN.NO_PERMISSION);

        case 'jwt expired':
          throw new BadRequestException(Err.TOKEN.JWT_EXPIRED);

        default:
          throw new HttpException('서버 오류입니다.', 500);
      }
    }
  }
}
