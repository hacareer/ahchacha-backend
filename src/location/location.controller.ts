import {Controller, Get, Post, Body, Patch, Param} from '@nestjs/common';
import {LocationService} from './location.service';
import {CreateLocationDto} from './dto/create-location.dto';
import {UpdateLocationDto} from './dto/update-location.dto';
import {User} from 'src/common/decorator/user.decorator';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  create(@User() user, @Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(user, createLocationDto);
  }

  @Get(':userId')
  findByUser(@Param('userId') userId: string) {
    return this.locationService.findByUser(+userId);
  }

  @Patch(':locationid')
  update(
    @Param('locationid') locationid: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.update(+locationid, updateLocationDto);
  }
}
