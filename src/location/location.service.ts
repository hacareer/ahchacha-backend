import {Injectable, BadRequestException} from '@nestjs/common';
import {CreateLocationDto} from './dto/create-location.dto';
import {UpdateLocationDto} from './dto/update-location.dto';
import {HttpService} from '@nestjs/axios';
import {map, lastValueFrom} from 'rxjs';
import {Location} from './entities/location.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './../user/entities/user.entity';
import {ChangeAddressToCoordinateDto} from './dto/change-address-to-coordinate.dto';
import {Err} from '../common/error';

@Injectable()
export class LocationService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAddress(address) {
    const _url = 'https://maps.googleapis.com/maps/api/geocode/json';

    const response = await lastValueFrom(
      this.httpService
        .get(_url, {
          params: {
            address: `${address}`,
            key: process.env.API_KEY,
          },
        })
        .pipe(
          map((response) => {
            return response.data.results[0].geometry.location;
          }),
        ),
    );
    return response;
  }

  async getCoordinate(lat, long) {
    const _url = 'https://maps.googleapis.com/maps/api/geocode/json';
    console.log(`${lat},${long}`);
    const response = await lastValueFrom(
      this.httpService
        .get(_url, {
          params: {
            latlng: `${lat},${long}`,
            key: process.env.API_KEY,
            language: 'ko',
          },
        })
        .pipe(
          map((response) => {
            return response.data.results[0].formatted_address;
          }),
        ),
    );
    return response;
  }

  async createLocation(userId: number, createLocationDto: CreateLocationDto) {
    let latitude;
    let longitude;
    let address;
    if (createLocationDto.address !== null) {
      const coordinate = await this.getAddress(createLocationDto.address);
      latitude = coordinate.lat;
      longitude = coordinate.lng;
      address = createLocationDto.address;
    } else {
      latitude = createLocationDto.latitude;
      longitude = createLocationDto.longitude;
      address = await this.getCoordinate(
        createLocationDto.latitude,
        createLocationDto.longitude,
      );
    }
    const location = await this.locationRepository.save({
      address: address,
      latitude,
      longitude,
    });
    await this.userRepository.update(userId, {location});
    return location;
  }

  async getLocationInfo(locationId: number) {
    const existingLoc = await this.locationRepository.findOne({
      where: {
        id: locationId,
      },
    });
    if (!existingLoc) {
      throw new BadRequestException(Err.UNIV.NOT_FOUND);
    }
    return existingLoc;
  }

  async updateLocation(
    locationId: number,
    updateLocationDto: UpdateLocationDto,
  ) {
    await this.getLocationInfo(locationId);
    let latitude;
    let longitude;
    let address;
    if (updateLocationDto.address) {
      const coordinate = await this.getAddress(updateLocationDto.address);
      latitude = coordinate.lat;
      longitude = coordinate.lng;
      address = updateLocationDto.address;
    } else {
      latitude = updateLocationDto.latitude;
      longitude = updateLocationDto.longitude;
      address = await this.getCoordinate(
        updateLocationDto.latitude,
        updateLocationDto.longitude,
      );
    }
    await this.locationRepository.update(locationId, {
      address,
      latitude,
      longitude,
    });
    return 'update success';
  }

  async changeAddressToCoordinate(
    changeAddressToCoordinateDto: ChangeAddressToCoordinateDto,
  ) {
    const _url = 'https://maps.googleapis.com/maps/api/geocode/json';
    const response = await lastValueFrom(
      this.httpService
        .get(_url, {
          params: {
            address: `${changeAddressToCoordinateDto.address}`,
            key: process.env.API_KEY,
          },
        })
        .pipe(
          map((response) => {
            return response.data.results[0].geometry.location;
          }),
        ),
    );
    const {lat, lng} = response;
    return {latitude: lat, longitude: lng};
  }
}
