import {
  Controller,
  Get,
  Post,
  Req,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {SecondDoseService} from './second-dose.service';
import {TransformInterceptor} from 'src/transform.interceptor';

@Controller('second-dose')
@UseInterceptors(TransformInterceptor)
export class SecondDoseController {
  constructor(private readonly secondDoseService: SecondDoseService) {}

  @Post()
  create(@Req() req) {
    return this.secondDoseService.create(req.user);
  }

  @Get()
  countByUniv(
    @Query('univId') univId: number,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.secondDoseService.countByUniv(univId, from, to);
  }
}
