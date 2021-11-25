import {ApiTags} from '@nestjs/swagger';
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
  validateUser(@Body() kakaoUserDto: KakaoUserDto) {
    return this.authService.validateUser(kakaoUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiDocs.registUser('회원가입 API')
  @Post('auth/signup')
  async registUser(@User() user, @Body() createUserDto: CreateUserDto) {
    return this.authService.registUser(user, createUserDto);
  }

  @UseGuards(JwtRefreshGuard)
  @ApiDocs.getAccessToken('accessToken 재발급 API')
  @Get('auth/accessToken')
  async getAccessToken(@User() user) {
    const access_token = await this.authService.createAccessToken(user);
    return {access_token};
  }

  @UseGuards(JwtRefreshGuard)
  @ApiDocs.getRefreshToken('refreshToken 재발급 API')
  @Get('auth/refreshToken')
  async getRefreshToken(@User() user) {
    const access_token = await this.authService.createAccessToken(user);
    const refresh_token = await this.authService.reissueRefreshToken(user);
    return {
      access_token,
      refresh_token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  @ApiDocs.getLoginInfo('사용자 정보 조회 API')
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
  @Patch('/my')
  @ApiDocs.updateUserInfo('사용자 정보 갱신 API')
  updateUserInfo(@User() user, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUserInfo(user.id, updateUserDto);
  }
}
