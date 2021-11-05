import {Injectable} from '@nestjs/common';
import * as node_geocoder from 'node-geocoder';
import {CreateLocationDto} from './dto/create-location.dto';
import {UpdateLocationDto} from './dto/update-location.dto';
import {HttpService} from '@nestjs/axios';
import {response} from 'express';
import {map, lastValueFrom} from 'rxjs';
import {Location} from './entities/location.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class LocationService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async getCoordinate(address) {
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

  async create(createLocationDto: CreateLocationDto) {
    const {lat, lng} = await this.getCoordinate(createLocationDto.address);
    return this.locationRepository.save({
      address: createLocationDto.address,
      latitude: lat,
      longitude: lng,
    });
  }

  findAll() {
    return `This action returns all location`;
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }
}
