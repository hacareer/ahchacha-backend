import {
  Controller,
  Get,
  Post,
  Req,
  Query,
  UseInterceptors,
  UseGuards,
  Param,
} from '@nestjs/common';
import {SecondDoseService} from './second-dose.service';
import {TransformInterceptor} from 'src/transform.interceptor';
import {JwtAuthGuard} from 'src/auth/guard/jwt-auth.guard';

@Controller('second-dose')
@UseInterceptors(TransformInterceptor)
export class SecondDoseController {
  constructor(private readonly secondDoseService: SecondDoseService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() req) {
    return this.secondDoseService.create(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':univId')
  countByUniv(
    @Param('univId') univId: number,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.secondDoseService.countByUniv(univId, from, to);
  }
}
