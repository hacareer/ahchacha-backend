import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {UnivService} from './univ.service';
import {CreateUnivDto} from './dto/create-univ.dto';
import {UpdateUnivDto} from './dto/update-univ.dto';

@Controller('univ')
export class UnivController {
  constructor(private readonly univService: UnivService) {}

  @Post()
  create(@Body() createUnivDto: CreateUnivDto) {
    return this.univService.create(createUnivDto);
  }

  @Get()
  findAll() {
    return this.univService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.univService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUnivDto: UpdateUnivDto) {
    return this.univService.update(+id, updateUnivDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.univService.remove(+id);
  }
}
