import {
  Controller,
  Get,
  Param,
  ParseFloatPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import {query} from 'express';
import {JwtAuthGuard} from 'src/auth/guard/jwt-auth.guard';
import {QueryExpressionMap} from 'typeorm/query-builder/QueryExpressionMap';
import {ClinicService} from './clinic.service';

@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @UseGuards(JwtAuthGuard)
  @Get('name')
  findByName(@Query('word') word: string) {
    return this.clinicService.findByName(word);
  }

  @UseGuards(JwtAuthGuard)
  @Get('loc/:lat/:lng')
  findNearBy1Km(
    @Param('lat', ParseFloatPipe) lat: number,
    @Param('lng', ParseFloatPipe) lng: number,
  ) {
    return this.clinicService.findNearBy1Km(lat, lng);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':clinicId')
  findOne(@Param('clinicId') clinicId: string) {
    return this.clinicService.findOne(+clinicId);
  }
}
