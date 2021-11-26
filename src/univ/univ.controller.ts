import {Controller, Get, Param, Query, UseGuards} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {ApiDocs} from './univ.docs';
import {UnivService} from './univ.service';
import {JwtAuthGuard} from './../auth/guard/jwt-auth.guard';

@Controller('univ')
@ApiTags('univ')
export class UnivController {
  constructor(private readonly univService: UnivService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiDocs.findAll('모든 학교 조회  API')
  findAll() {
    return this.univService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('word')
  @ApiDocs.findByName('특정 학교 조회  API')
  findByName(@Query('word') word: string) {
    return this.univService.findByName(word);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':univId')
  @ApiDocs.findByUnivId('특정 학교 조회  API')
  findByUnivId(@Param('univId') univId: number) {
    return this.univService.findByUnivId(univId);
  }
}
