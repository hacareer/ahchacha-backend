import {Controller, Get, Param, Query} from '@nestjs/common';
import {UnivService} from './univ.service';

@Controller('univ')
export class UnivController {
  constructor(private readonly univService: UnivService) {}

  @Get()
  findAll() {
    return this.univService.findAll();
  }

  @Get('name')
  findByName(@Query('word') word: string) {
    return this.univService.findByName(word);
  }

  @Get(':univId')
  findByUnivId(@Param('univId') univId: string) {
    return this.univService.findByUnivId(+univId);
  }
}
