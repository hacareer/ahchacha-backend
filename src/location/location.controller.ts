import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import {LocationService} from './location.service';
import {CreateLocationDto} from './dto/create-location.dto';
import {UpdateLocationDto} from './dto/update-location.dto';
import {User} from 'src/common/decorator/user.decorator';
import {TransformInterceptor} from 'src/transform.interceptor';

@Controller('location')
@UseInterceptors(TransformInterceptor)
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  create(@User() user, @Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(user, createLocationDto);
  }

  @Get()
  findAll() {
    return this.locationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.locationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.update(+id, updateLocationDto);
  }
}
