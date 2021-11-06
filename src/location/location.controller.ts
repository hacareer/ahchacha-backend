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
    return this.locationService.create(user, createLocationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  @ApiDocs.findByUser('위치 정보 조회 API')
  findByUser(@Param('userId') userId: string) {
    return this.locationService.findByUser(+userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':locationid')
  @ApiDocs.update('위치 정보 갱신 API')
  update(
    @Param('locationid') locationid: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.update(+locationid, updateLocationDto);
  }
}
