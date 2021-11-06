import {
  Controller,
  Get,
  Param,
  Query,
  ParseFloatPipe,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import {JwtAuthGuard} from 'src/auth/guard/jwt-auth.guard';
import {TransformInterceptor} from 'src/transform.interceptor';
import {ClinicService} from './clinic.service';

@Controller('clinic')
@UseInterceptors(TransformInterceptor)
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @UseGuards(JwtAuthGuard)
  @Get('near/:lat/:lng')
  findNear(
    @Param('lat', ParseFloatPipe) lat: number,
    @Param('lng', ParseFloatPipe) lng: number,
  ) {
    return this.clinicService.findNear(lat, lng);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':clinicId')
  findOne(@Param('clinicId') clinicId: string) {
    return this.clinicService.findOne(+clinicId);
  }
}
