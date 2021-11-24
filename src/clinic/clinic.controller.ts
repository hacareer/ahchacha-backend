import {Controller, Get, Param, ParseFloatPipe, Query} from '@nestjs/common';
import {ClinicService} from './clinic.service';
import {ApiTags} from '@nestjs/swagger';
import {ApiDocs} from './clinic.docs';

@Controller('clinic')
@ApiTags('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Get(':clinicId')
  @ApiDocs.findOne('특정 선별소 조회 API')
  findOne(@Param('clinicId') clinicId: number) {
    return this.clinicService.findOne(clinicId);
  }

  @Get('word/')
  @ApiDocs.findByName('특정선별소 조회 API')
  findByName(@Query('word') word: string) {
    return this.clinicService.findByName(word);
  }

  @Get('area/:lat/:lng')
  @ApiDocs.findNearBy5Km('반경 5KM 선별소 조회 API')
  findNearBy5Km(
    @Param('lat', ParseFloatPipe) lat: number,
    @Param('lng', ParseFloatPipe) lng: number,
  ) {
    return this.clinicService.findNearBy5Km(lat, lng);
  }
}
