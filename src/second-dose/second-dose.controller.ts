import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { SecondDoseService } from './second-dose.service';
import { CreateSecondDoseDto } from './dto/create-second-dose.dto';
import { UpdateSecondDoseDto } from './dto/update-second-dose.dto';

@Controller('second-dose')
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
