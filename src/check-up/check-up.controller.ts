import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {CheckUpService} from './check-up.service';
import {CreateCheckUpDto} from './dto/create-check-up.dto';
import {UpdateCheckUpDto} from './dto/update-check-up.dto';

@Controller('check-up')
export class CheckUpController {
  constructor(private readonly checkUpService: CheckUpService) { }

  @Post()
  create(@Body() createCheckUpDto: CreateCheckUpDto) {
    return this.checkUpService.create(createCheckUpDto);
  }
}
