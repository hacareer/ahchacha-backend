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
import { Body, Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Post } from '@nestjs/common';
import { JwtRefreshGuard } from 'src/auth/guard/jwt-refreshToken-auth.guard';
import { KakaoUserDto } from './dto/kakao-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { userInfo } from 'os';
import { User } from 'src/common/decorator/user.decorator';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  validateUser(@Body() kakaoUserDto: KakaoUserDto) {
    return this.authService.validateUser(kakaoUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/signup')
  async registUser(
    @User() user,
    @Request() req: any,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.authService.registUser(req, createUserDto);
  }
  // 리프레쉬 토큰을 이용한 엑세스 토큰 재발급하기
  @UseGuards(JwtRefreshGuard)
  @Get('auth/refresh-accesstoken')
  async refreshAccessToken() {
    return { success: true, message: 'new accessToken Issuance success' };
  }
}
