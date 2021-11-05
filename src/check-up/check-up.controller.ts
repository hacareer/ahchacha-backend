import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {CheckUpService} from './check-up.service';
import {CreateCheckUpDto} from './dto/create-check-up.dto';
import {JwtAuthGuard} from './../auth/guard/jwt-auth.guard';
import {User} from 'src/common/decorator/user.decorator';
import {TransformInterceptor} from 'src/transform.interceptor';

@Controller('check-up')
@UseInterceptors(TransformInterceptor)
export class CheckUpController {
  constructor(private readonly checkUpService: CheckUpService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@User() user, @Body() createCheckUpDto: CreateCheckUpDto) {
    return this.checkUpService.create(user, createCheckUpDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  searchCheckUpByDate(
    @Param('userId') userId: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.checkUpService.searchCheckUpByDate(+userId, from, to);
  }
}
