import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import {JwtAuthGuard} from 'src/auth/guard/jwt-auth.guard';
import {User} from 'src/common/decorator/user.decorator';
import {CheckUpResultService} from './check-up-result.service';
import {CreateCheckUpResultDto} from './dto/create-check-up-result.dto';
import {UpdateCheckUpResultDto} from './dto/update-check-up-result.dto';

@Controller('check-up-result')
export class CheckUpResultController {
  constructor(private readonly checkUpResultService: CheckUpResultService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@User() user, @Body() createCheckUpResultDto: CreateCheckUpResultDto) {
    return this.checkUpResultService.create(user, createCheckUpResultDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  searchCheckUpResultByDate(
    @Param('userId') userId: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.checkUpResultService.searchCheckUpResultByDate(
      +userId,
      from,
      to,
    );
  }
}
