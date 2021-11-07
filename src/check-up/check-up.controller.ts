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

@Controller('check-up')
@ApiTags('check-up')
export class CheckUpController {
  constructor(private readonly checkUpService: CheckUpService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiDocs.create('검사 예약 생성 API')
  create(@User() user, @Body() createCheckUpDto: CreateCheckUpDto) {
    return this.checkUpService.create(user, createCheckUpDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  @ApiDocs.findAllByUser('모든 검사 예약 조회 API')
  findAllByUser(@Param('userId') userId: string) {
    return this.checkUpService.findAll(+userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/:checkUpId')
  @ApiDocs.findOneByUse('특정 검사 예약 조회 API')
  findOneByUse(
    @Param('userId') userId: string,
    @Param('checkUpId') checkUpId: string,
  ) {
    return this.checkUpService.findOne(+userId, +checkUpId);
  }

  //TODO 기간으로 조회하는 API

  @UseGuards(JwtAuthGuard)
  @Patch(':userId/:checkUpid')
  @ApiDocs.update('검사 예약 갱신 API')
  update(
    @Param('userId') userId: string,
    @Param('checkUpid') checkUpid: string,
    @Body() updateCheckUpDto: UpdateCheckUpDto,
  ) {
    return this.checkUpService.update(+userId, +checkUpid, updateCheckUpDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId/:checkUpid')
  @ApiDocs.remove('검사 예약 삭제 API')
  remove(
    @Param('userId') userId: string,
    @Param('checkUpid') checkUpid: string,
  ) {
    return this.checkUpService.remove(+userId, +checkUpid);
  }
}
