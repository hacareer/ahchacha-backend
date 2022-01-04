import {ApiTags} from '@nestjs/swagger';
import {AuthService} from '../auth/auth.service';
import {Body, Controller, Get, UseGuards, Param, Patch} from '@nestjs/common';
import {Post} from '@nestjs/common';
import {SignInDto} from './dto/sign-in.dto';
import {ApiDocs} from './user.docs';
import {User} from './../common/decorator/user.decorator';
import {JwtAuthGuard} from './../auth/guard/jwt-auth.guard';
import {JwtRefreshGuard} from './../auth/guard/jwt-refreshToken-auth.guard';
import {UserService} from './user.service';
import {UpdateMyInfoDto} from './dto/update-my-info.dto';
import {SignUpDto} from './dto/sign-up.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('auth/sign-in')
  @ApiDocs.signIn('로그인 API')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiDocs.signUp('회원가입 API')
  @Post('auth/signup')
  async signUp(@User() user, @Body() signUpDto: SignUpDto) {
    return this.authService.signUp(user, signUpDto);
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
    return await this.authService.reissueRefreshToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  @ApiDocs.getMyInfo('사용자 정보 조회 API')
  getMyInfo(@User() user) {
    return this.userService.getMyInfo(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('nickname/:nickname')
  @ApiDocs.checkUserBynickname('특정 닉네임 조회 API')
  checkUserBynickname(@Param('nickname') nickname: string) {
    return this.userService.checkUserBynickname(nickname);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/my')
  @ApiDocs.updateMyInfo('사용자 정보 갱신 API')
  updateMyInfo(@User() user, @Body() updateMyInfoDto: UpdateMyInfoDto) {
    return this.userService.updateMyInfo(user.id, updateMyInfoDto);
  }
}
