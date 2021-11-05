import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import {CheckUpService} from './check-up.service';
import {CreateCheckUpDto} from './dto/create-check-up.dto';
import {UpdateCheckUpDto} from './dto/update-check-up.dto';

@Controller('check-up')
export class CheckUpController {
  constructor(private readonly checkUpService: CheckUpService) {}

  @Post()
  create(@Req() req, @Body() createCheckUpDto: CreateCheckUpDto) {
    return this.checkUpService.create(req.user, createCheckUpDto);
  }

  @Get()
  findAll() {
    return this.checkUpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.checkUpService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCheckUpDto: UpdateCheckUpDto) {
    return this.checkUpService.update(+id, updateCheckUpDto);
  }
}
