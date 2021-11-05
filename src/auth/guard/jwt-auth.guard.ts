import {
  BadRequestException,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {AuthGuard} from '@nestjs/passport';
import {UserService} from 'src/user/user.service';
import {AuthService} from '../auth.service';
import {Err} from './../../error';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {
    super();
  }
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const {authorization} = request.headers;
    if (authorization === undefined) {
      throw new BadRequestException(Err.TOKEN.NOT_SEND_TOKEN);
    }

    const token = authorization.replace('Bearer ', '');
    const tokenValidate = await this.validate(token);
    if (tokenValidate.tokenReissue) {
      response.setHeader('access_token', tokenValidate.new_token);
      response.setHeader('tokenReissue', true);
    } else {
      response.setHeader('tokenReissue', false);
    }
    request.user = tokenValidate.user ? tokenValidate.user : tokenValidate;
    return true;
  }

  async validate(token: string) {
    try {
      // 토큰 검증
      const tokenVerify = await this.authService.tokenValidate(token);

      // 토큰의 남은 시간 체크
      const tokenExp = new Date(tokenVerify['exp'] * 1000);
      const current_time = new Date();

      const time_remaining = Math.floor(
        (tokenExp.getTime() - current_time.getTime()) / 1000 / 60,
      );

      if (tokenVerify.type === 'loginToken') {
        if (time_remaining < 5) {
          // 로그인 토큰의남은 시간이 5분 미만일때
          // 엑세스 토큰 정보로 유저를 찾는다.
          const user = await this.userService.findUserById(tokenVerify.id);
          const refreshToken = await this.authService.tokenValidate(
            user.refreshToken,
          );
          const refreshTokenUser = await this.userService.findUserById(
            refreshToken.id,
          );
          const new_token = await this.authService.createLoginToken(
            refreshTokenUser,
          );
          return {
            user: refreshTokenUser,
            new_token,
            tokenReissue: true,
          };
        } else {
          // 로그인 토큰의남은 시간이 5분 이상일때
          const user = await this.userService.findUserById(tokenVerify.id);
          return {
            user,
            tokenReissue: false,
          };
        }
      } else {
        return tokenVerify;
      }
    } catch (error) {
      switch (error.message) {
        // 토큰에 대한 오류를 판단합니다.
        case 'invalid token':
          throw new BadRequestException(Err.TOKEN.INVALID_TOKEN);

        case 'jwt expired':
          throw new BadRequestException(Err.TOKEN.JWT_EXPIRED);

        default:
          throw new HttpException('서버 오류입니다.', 500);
      }
    }
  }
}
