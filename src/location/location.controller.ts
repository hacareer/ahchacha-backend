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
import {ChangeAddressToCoordinateDto} from './dto/change-address-to-coordinate.dto';

@Controller('location')
@ApiTags('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiDocs.createLocation('위치 정보 생성 API')
  createLocation(@User() user, @Body() createLocationDto: CreateLocationDto) {
    return this.locationService.createLocation(user.id, createLocationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':locationId')
  @ApiDocs.getLocationInfo('위치 정보 조회 API')
  getLocationInfo(@Param('locationId') locationId: number) {
    return this.locationService.getLocationInfo(locationId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':locationId')
  @ApiDocs.updateLocation('위치 정보 갱신 API')
  updateLocation(
    @Param('locationId') locationId: number,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationService.updateLocation(locationId, updateLocationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('coordinate')
  @ApiDocs.changeAddressToCoordinate('좌표 제공 API')
  changeAddressToCoordinate(
    @Body() changeAddressToCoordinateDto: ChangeAddressToCoordinateDto,
  ) {
    return this.locationService.changeAddressToCoordinate(
      changeAddressToCoordinateDto,
    );
  }
}
