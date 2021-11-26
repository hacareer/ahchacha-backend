import {
  Controller,
  Get,
  Param,
  ParseFloatPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import {ClinicService} from './clinic.service';
import {ApiTags} from '@nestjs/swagger';
import {ApiDocs} from './clinic.docs';
import {JwtAuthGuard} from './../auth/guard/jwt-auth.guard';

@Controller('clinic')
@ApiTags('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':clinicId')
  @ApiDocs.findOne('특정 선별소 조회 API')
  findOne(@Param('clinicId') clinicId: number) {
    return this.clinicService.findOne(clinicId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('word/')
  @ApiDocs.findByName('특정선별소 조회 API')
  findByName(@Query('word') word: string) {
    return this.clinicService.findByName(word);
  }

  @UseGuards(JwtAuthGuard)
  @Get('area/:lat/:lng')
  @ApiDocs.findNearBy5Km('반경 5KM 선별소 조회 API')
  findNearBy5Km(
    @Query('lat', ParseFloatPipe) lat: number,
    @Query('lng', ParseFloatPipe) lng: number,
  ) {
    return this.clinicService.findNearBy5Km(lat, lng);
  }
}
