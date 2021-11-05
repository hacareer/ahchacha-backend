import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth/auth.service';
import {
  Body,
  Controller,
  Get,
  Request,
  UseGuards,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Post } from '@nestjs/common';
import { JwtRefreshGuard } from 'src/auth/guard/jwt-refreshToken-auth.guard';
import { KakaoUserDto } from './dto/kakao-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/common/decorator/user.decorator';
import { UserService } from 'src/user/user.service';
import { TransformInterceptor } from 'src/transform.interceptor';

@ApiTags('user')
@Controller('user')
@UseInterceptors(TransformInterceptor)
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

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
    return this.authService.registUser(user, createUserDto);
  }
  // 리프레쉬 토큰을 이용한 엑세스 토큰 재발급하기
  @UseGuards(JwtRefreshGuard)
  @Get('auth/refresh-accesstoken')
  async refreshAccessToken() {
    return { success: true, message: 'new accessToken Issuance success' };
  }

  @Get(':id')
  findUserById(@Param('id') id: string) {
    return this.userService.findUserById(+id);
  }

  @Get(':nickname')
  findUserBynickname(@Param('nickname') nickname: string) {
    return this.userService.findUserBynickname(nickname);
  }
}
