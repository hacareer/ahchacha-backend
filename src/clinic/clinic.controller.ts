import {
  Controller,
  Get,
  Param,
  ParseFloatPipe,
  UseGuards,
} from '@nestjs/common';
import {JwtAuthGuard} from 'src/auth/guard/jwt-auth.guard';
import {ClinicService} from './clinic.service';

@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @UseGuards(JwtAuthGuard)
  @Get('near/:lat/:lng')
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
