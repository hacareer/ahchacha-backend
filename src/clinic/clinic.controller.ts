import {
  Controller,
  Get,
  Param,
  Query,
  ParseFloatPipe,
  UseInterceptors,
} from '@nestjs/common';
import {TransformInterceptor} from 'src/transform.interceptor';
import {ClinicService} from './clinic.service';

@Controller('clinic')
@UseInterceptors(TransformInterceptor)
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Get()
  findNear(
    @Query('lat', ParseFloatPipe) lat: number,
    @Query('lng', ParseFloatPipe) lng: number,
  ) {
    return this.clinicService.findNear(lat, lng);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicService.findOne(+id);
  }
}
