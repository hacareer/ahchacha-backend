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
  @Get('me')
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
  update(@Body() updateCheckUpDto: UpdateCheckUpDto) {
    return this.checkUpService.update(updateCheckUpDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':checkUpId')
  @ApiDocs.remove('검사 예약 삭제 API')
  remove(@Param('checkUpId') checkUpId: number) {
    return this.checkUpService.remove(checkUpId);
  }
}
