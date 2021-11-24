import {Controller, Get, Param, Query} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {ApiDocs} from './univ.docs';
import {UnivService} from './univ.service';

@Controller('univ')
@ApiTags('univ')
export class UnivController {
  constructor(private readonly univService: UnivService) {}

  @Get()
  @ApiDocs.findAll('모든 학교 조회  API')
  findAll() {
    return this.univService.findAll();
  }

  @Get('word')
  @ApiDocs.findByName('특정 학교 조회  API')
  findByName(@Query('word') word: string) {
    return this.univService.findByName(word);
  }

  @Get(':univId')
  @ApiDocs.findByUnivId('특정 학교 조회  API')
  findByUnivId(@Param('univId') univId: number) {
    return this.univService.findByUnivId(univId);
  }
}
