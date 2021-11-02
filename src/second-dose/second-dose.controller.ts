import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SecondDoseService } from './second-dose.service';
import { CreateSecondDoseDto } from './dto/create-second-dose.dto';
import { UpdateSecondDoseDto } from './dto/update-second-dose.dto';

@Controller('second-dose')
export class SecondDoseController {
  constructor(private readonly secondDoseService: SecondDoseService) {}

  @Post()
  create(@Body() createSecondDoseDto: CreateSecondDoseDto) {
    return this.secondDoseService.create(createSecondDoseDto);
  }

  @Get()
  findAll() {
    return this.secondDoseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.secondDoseService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSecondDoseDto: UpdateSecondDoseDto,
  ) {
    return this.secondDoseService.update(+id, updateSecondDoseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.secondDoseService.remove(+id);
  }
}
