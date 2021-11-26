import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {userInfo} from 'os';
import {JwtAuthGuard} from 'src/auth/guard/jwt-auth.guard';
import {User} from 'src/common/decorator/user.decorator';
import {ApiDocs} from './check-up.docs';
import {CheckUpService} from './check-up.service';
import {CreateCheckUpDto} from './dto/create-check-up.dto';
import {UpdateCheckUpDto} from './dto/update-check-up.dto';
import {PushNotificationService} from './../push-notification/push-notification.service';
import {UserService} from 'src/user/user.service';

@Controller('check-up')
@ApiTags('check-up')
export class CheckUpController {
  constructor(
    private readonly checkUpService: CheckUpService,
    private readonly pushNotificationService: PushNotificationService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiDocs.create('검사 예약 생성 API')
  async create(@User() user, @Body() createCheckUpDto: CreateCheckUpDto) {
    const {deviceId, nickname} = await this.userService.getLoginInfo(user.id);
    await this.pushNotificationService.scheduleAlarm({
      date: createCheckUpDto.date,
      userId: user.id,
      deviceId: deviceId,
      nickname,
    });
    return this.checkUpService.create(user, createCheckUpDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  @ApiDocs.findAllByUser('모든 검사 예약 조회 API')
  findAllByUser(@User() user) {
    return this.checkUpService.findAll(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':checkUpId')
  @ApiDocs.findOneByUse('특정 검사 예약 조회 API')
  findOneByUse(@Param('checkUpId') checkUpId: number) {
    return this.checkUpService.findOne(checkUpId);
  }

  //TODO 기간으로 조회하는 API

  @UseGuards(JwtAuthGuard)
  @Patch(':checkUpId')
  @ApiDocs.update('검사 예약 갱신 API')
  update(
    @Param('checkUpId') checkUpId: number,
    @Body() updateCheckUpDto: UpdateCheckUpDto,
  ) {
    // TODO 푸시 알림 수정
    return this.checkUpService.update(checkUpId, updateCheckUpDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':checkUpId')
  @ApiDocs.remove('검사 예약 삭제 API')
  remove(@Param('checkUpId') checkUpId: number) {
    // TODO 푸시 알림 삭제
    return this.checkUpService.remove(checkUpId);
  }
}
