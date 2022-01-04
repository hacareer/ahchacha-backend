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
import {JwtAuthGuard} from 'src/auth/guard/jwt-auth.guard';
import {User} from 'src/common/decorator/user.decorator';
import {ApiDocs} from './check-up.docs';
import {CheckUpService} from './check-up.service';
import {CreateCheckUpDto} from './dto/create-check-up.dto';
import {PushNotificationService} from './../push-notification/push-notification.service';
import {UserService} from 'src/user/user.service';
import {UpdateCheckUpDto} from './dto/update-check-up.dto';

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
  @ApiDocs.createCheckUp('검사 예약 생성 API')
  async createCheckUp(
    @User() user,
    @Body() createCheckUpDto: CreateCheckUpDto,
  ) {
    const createdCheckUpService = await this.checkUpService.createCheckUp(
      user.id,
      createCheckUpDto,
    );
    const {deviceId, nickname} = await this.userService.getMyInfo(user.id);
    if (createCheckUpDto.notificationTime.length > 0) {
      await this.pushNotificationService.scheduleAlarm({
        date: createCheckUpDto.date,
        userId: user.id,
        deviceId: deviceId,
        nickname,
        notification: createCheckUpDto.notificationTime,
        clinicName: createdCheckUpService.clinic.name,
        clinicAddress: createdCheckUpService.clinic.address,
      });
    }
    return createdCheckUpService;
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  @ApiDocs.findMyCheckUp('모든 검사 예약 조회 API')
  findMyCheckUp(@User() user) {
    return this.checkUpService.findMyCheckUp(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':checkUpId')
  @ApiDocs.findCheckUpbyId('특정 검사 예약 조회 API')
  findCheckUpbyId(@Param('checkUpId') checkUpId: number) {
    return this.checkUpService.findCheckUpbyId(checkUpId);
  }

  //TODO 기간으로 조회하는 API
  @UseGuards(JwtAuthGuard)
  @Patch(':checkUpId')
  @ApiDocs.updateCheckUp('검사 예약 갱신 API')
  updateCheckUp(
    @Param('checkUpId') checkUpId: number,
    @Body() updateCheckUpDto: UpdateCheckUpDto,
  ) {
    // TODO 푸시 알림 수정
    return this.checkUpService.updateCheckUp(checkUpId, updateCheckUpDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':checkUpId')
  @ApiDocs.deleteCheckUp('검사 예약 삭제 API')
  deleteCheckUp(@Param('checkUpId') checkUpId: number) {
    // TODO 푸시 알림 삭제
    return this.checkUpService.deleteCheckUp(checkUpId);
  }
}
