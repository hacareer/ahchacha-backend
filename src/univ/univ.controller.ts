import {Controller, Get, Param} from '@nestjs/common';
import {UnivService} from './univ.service';

@Controller('univ')
export class UnivController {
  constructor(private readonly univService: UnivService) {}

  @Get()
  findAll() {
    return this.univService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.univService.findOne(+id);
  }
}
