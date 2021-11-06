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

  async create(user, createLocationDto: CreateLocationDto) {
    const existingUser = await this.userRepository.findOne(user.id);
    const {lat, lng} = await this.getCoordinate(createLocationDto.address);
    return await this.locationRepository.save({
      address: createLocationDto.address,
      latitude: lat,
      longitude: lng,
      user: existingUser,
    });
  }

  async findByUser(userId: number) {
    const existingUser = await this.userRepository.findOne(userId);
    return await this.locationRepository.findOne({
      where: {
        user: existingUser,
      },
    });
  }

  async update(id: number, updateLocationDto: UpdateLocationDto) {
    const {lat, lng} = await this.getCoordinate(updateLocationDto.address);
    return await this.locationRepository.update(id, {
      address: updateLocationDto.address,
      longitude: lng,
      latitude: lat,
    });
  }
}
