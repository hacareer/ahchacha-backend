import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from '../auth/auth.service';
import {
  Body,
  Controller,
  Get,
  Req,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Post } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { JwtRefreshGuard } from 'src/auth/guard/jwt-refreshToken-auth.guard';
import { RegistUserDTO } from './dto/registUser.dto';
import { User } from 'src/user/entities/user.entity';
import { KakaoUserDto } from './dto/kakao-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/kakao')
  validateKakao(@Body() kakaoUserDto: KakaoUserDto) {
    return this.authService.validateKakao(kakaoUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/login')
  async registUser(
    @Request() req: any,
    @Body() registUserDTO: RegistUserDTO,
    @Res() res: Response,
  ) {
    try {
      const { user_email, user_nick, user_provider, user_token } = req.user;
      const { user_tel, user_privacy } = registUserDTO;
      // 1회용 토큰인경우
      if (user_token === 'onceToken') {
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into(User)
          .values({
            user_email,
            user_tel,
            user_nick,
            user_provider,
            user_privacy,
          })
          .execute();
        const user = await this.authService.validateUser(user_email);
        const access_token = await this.authService.createLoginToken(user);
        const refresh_token = await this.authService.createRefreshToken(user);

        res.setHeader('access_token', access_token);
        res.setHeader('refresh_token', refresh_token);
        res.json({ success: true, message: 'user login successful' });
      }
    } catch (error) {
      console.log(error);
    }
    // 그 외의 경우
    return false;
  }
  // 리프레쉬 토큰을 이용한 엑세스 토큰 재발급하기
  @UseGuards(JwtRefreshGuard)
  @Get('auth/refresh-accesstoken')
  async refreshAccessToken() {
    return { success: true, message: 'new accessToken Issuance success' };
  }
}
