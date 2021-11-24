import {Injectable} from '@nestjs/common';
import {CreateLocationDto} from './dto/create-location.dto';
import {UpdateLocationDto} from './dto/update-location.dto';
import {HttpService} from '@nestjs/axios';
import {map, lastValueFrom} from 'rxjs';
import {Location} from './entities/location.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './../user/entities/user.entity';

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

  async create(createLocationDto: CreateLocationDto) {
    let lat;
    let lng;
    let address;
    if (createLocationDto.address !== null) {
      const coordinate = await this.getAddress(createLocationDto.address);
      lat = coordinate.lat;
      lng = coordinate.lng;
      address = createLocationDto.address;
    }
    if (createLocationDto.lat !== null && createLocationDto.lng) {
      lat = createLocationDto.lat;
      lng = createLocationDto.lng;
      address = await this.getCoordinate(
        createLocationDto.lat,
        createLocationDto.lng,
      );
    }
    const location = await this.locationRepository.save({
      address: address,
      latitude: lat,
      longitude: lng,
    });
    return location;
  }

  async getLocInfo(locationId: number) {
    return await this.locationRepository.findOne({
      where: {
        id: locationId,
      },
    });
  }

  async update(locationId: number, updateLocationDto: UpdateLocationDto) {
    const address = await this.getCoordinate(
      updateLocationDto.lat,
      updateLocationDto.lng,
    );
    await this.locationRepository.update(locationId, {
      address,
      latitude: updateLocationDto.lat,
      longitude: updateLocationDto.lng,
    });
    return 'update success';
  }
}
