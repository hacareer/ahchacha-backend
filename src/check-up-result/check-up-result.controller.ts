import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from 'src/auth/guard/jwt-auth.guard';
import {User} from 'src/common/decorator/user.decorator';
import {ApiDocs} from './check-up-result.docs';
import {CheckUpResultService} from './check-up-result.service';
import {CreateCheckUpResultDto} from './dto/create-check-up-result.dto';

@Controller('check-up-result')
@ApiTags('check-up-result')
export class CheckUpResultController {
  constructor(private readonly checkUpResultService: CheckUpResultService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  @ApiDocs.createCheckUpResult('검사 결과 생성 API')
  createCheckUpResult(
    @User() user,
    @Body() createCheckUpResultDto: CreateCheckUpResultDto,
  ) {
    return this.checkUpResultService.createCheckUpResult(
      user.id,
      createCheckUpResultDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  @ApiDocs.getCheckUpResult('검사 결과 조회 API')
  getCheckUpResult(
    @User() user,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.checkUpResultService.getCheckUpResult(user.id, from, to);
  }
}
