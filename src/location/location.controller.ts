import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import {LocationService} from './location.service';
import {CreateLocationDto} from './dto/create-location.dto';
import {UpdateLocationDto} from './dto/update-location.dto';
import {User} from 'src/common/decorator/user.decorator';
import {ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from 'src/auth/guard/jwt-auth.guard';
import {ApiDocs} from './location.docs';

@Controller('location')
@ApiTags('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiDocs.create('위치 정보 생성 API')
  create(@User() user, @Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':locationId')
  @ApiDocs.getLocInfo('위치 정보 조회 API')
  getLocInfo(@Param('locationId') locationId: number) {
    return this.locationService.getLocInfo(locationId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':locationId')
  @ApiDocs.update('위치 정보 갱신 API')
  update(
    @Param('locationId') locationId: number,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.update(locationId, updateLocationDto);
  }
}
