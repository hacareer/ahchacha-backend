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
import {userInfo} from 'os';
import {JwtAuthGuard} from 'src/auth/guard/jwt-auth.guard';
import {User} from 'src/common/decorator/user.decorator';
import {CheckUpService} from './check-up.service';
import {CreateCheckUpDto} from './dto/create-check-up.dto';
import {UpdateCheckUpDto} from './dto/update-check-up.dto';

@Controller('check-up')
export class CheckUpController {
  constructor(private readonly checkUpService: CheckUpService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@User() user, @Body() createCheckUpDto: CreateCheckUpDto) {
    return this.checkUpService.create(user, createCheckUpDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  findAllByUser(@Param('userId') userId: string) {
    return this.checkUpService.findAll(+userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/:checkUpid')
  findOneByUse(
    @Param('userId') userId: string,
    @Param('checkUpid') checkUpid: string,
  ) {
    return this.checkUpService.findOne(+userId, +checkUpid);
  }

  //TODO 기간으로 조회하는 API

  @UseGuards(JwtAuthGuard)
  @Patch(':userId/:checkUpid')
  update(
    @Param('userId') userId: string,
    @Param('checkUpid') checkUpid: string,
    @Body() updateCheckUpDto: UpdateCheckUpDto,
  ) {
    return this.checkUpService.update(+userId, +checkUpid, updateCheckUpDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId/:checkUpid')
  remove(
    @Param('userId') userId: string,
    @Param('checkUpid') checkUpid: string,
  ) {
    return this.checkUpService.remove(+userId, +checkUpid);
  }
}
