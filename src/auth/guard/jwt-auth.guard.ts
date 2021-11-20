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
    // const response = context.switchToHttp().getResponse();

    const {authorization} = request.headers;
    if (authorization === undefined) {
      throw new BadRequestException(Err.TOKEN.NOT_SEND_TOKEN);
    }

    const token = authorization.replace('Bearer ', '');
    const tokenValidate = await this.validate(token);
    // if (tokenValidate.tokenReissue) {
    //   response.setHeader('accessToken', tokenValidate.new_token);
    //   response.setHeader('accessTokenReissue', true);
    // } else {
    //   response.setHeader('accessTokenReissue', false);
    // }
    request.user = tokenValidate.user ? tokenValidate.user : tokenValidate;
    return true;
  }

  async validate(token: string) {
    try {
      // 토큰 검증
      const tokenVerify = await this.authService.tokenValidate(token);
      if (tokenVerify.type === 'accessToken') {
        const user = await this.userService.findUserById(tokenVerify.id);
        return user;
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
