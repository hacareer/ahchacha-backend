import {ApiTags, ApiBearerAuth} from '@nestjs/swagger';
import {AuthService} from '../auth/auth.service';
import {
  Body,
  Controller,
  Get,
  UseGuards,
  Param,
  Patch,
  Req,
  Res,
} from '@nestjs/common';
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
  async validateUser(@Res() res, @Body() kakaoUserDto: KakaoUserDto) {
    const token = await this.authService.validateUser(kakaoUserDto);
    if (token.type === 'login') {
      res.cookie('access_token', token.access_token);
      res.cookie('refresh_token', token.refresh_token);
    } else {
      res.cookie('once_token', token.once_token);
    }
    res.end();
  }

  @UseGuards(JwtAuthGuard)
  @ApiDocs.registUser('회원가입 API')
  @Post('auth/signup')
  async registUser(
    @Res() res,
    @User() user,
    @Body() createUserDto: CreateUserDto,
  ) {
    const token = await this.authService.registUser(user, createUserDto);
    if (token) {
      res.cookie('access_token', token.access_token);
      res.cookie('refresh_token', token.refresh_token);
    }
    res.end();
  }

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
