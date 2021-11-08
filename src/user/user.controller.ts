import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {AuthService} from '../auth/auth.service';
import {Body, Controller, Get, UseGuards, Param, Patch} from '@nestjs/common';
import {JwtAuthGuard} from 'src/auth/guard/jwt-auth.guard';
import {Post} from '@nestjs/common';
import {JwtRefreshGuard} from 'src/auth/guard/jwt-refreshToken-auth.guard';
import {KakaoUserDto} from './dto/kakao-user.dto';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from 'src/common/decorator/user.decorator';
import {UserService} from 'src/user/user.service';
import {ApiDocs} from './user.docs';
import {UpdateUserDto} from './dto/update-user.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('auth/login')
  @ApiDocs.validateUser('로그인 API')
  validateUser(@Body() kakaoUserDto: KakaoUserDto) {
    return this.authService.validateUser(kakaoUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiDocs.registUser('회원가입 API')
  @Post('auth/signup')
  async registUser(@User() user, @Body() createUserDto: CreateUserDto) {
    return this.authService.registUser(user, createUserDto);
  }
  // 리프레쉬 토큰을 이용한 엑세스 토큰 재발급하기
  @UseGuards(JwtRefreshGuard)
  @ApiDocs.refreshAccessToken('accessToken 재발급 API')
  @Get('auth/refresh-accesstoken')
  async refreshAccessToken() {
    return {
      success: true,
      code: 200,
      data: 'new accessToken Issuance success',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  @ApiDocs.getLoginInfo('현재 로그인 사용자 정보 API')
  getLoginInfo(@User() user) {
    return this.userService.getLoginInfo(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('nickname/:nickname')
  @ApiDocs.checkUserBynickname('특정 닉네임 조회 API')
  checkUserBynickname(@Param('nickname') nickname: string) {
    return this.userService.checkUserBynickname(nickname);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('univ/:univId')
  @ApiDocs.updateUnivInfo('사용자 학교정보 갱신 API')
  updateUnivInfo(@User() user, @Param('univId') univId: string) {
    return this.userService.updateUnivInfo(user.id, +univId);
  }
}
