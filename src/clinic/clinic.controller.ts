import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseFloatPipe,
} from '@nestjs/common';
import {ClinicService} from './clinic.service';
import {CreateClinicDto} from './dto/create-clinic.dto';
import {UpdateClinicDto} from './dto/update-clinic.dto';

@Controller('clinic')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) { }

  @Get()
  findNear(
    @Query('lat', ParseFloatPipe) lat: number,
    @Query('lng', ParseFloatPipe) lng: number,
  ) {
    return this.clinicService.findNear(lat, lng);
  }

  @Get()
  findAll() {
    return this.clinicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClinicDto: UpdateClinicDto) {
    return this.clinicService.update(+id, updateClinicDto);
  }
}
