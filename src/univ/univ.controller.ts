import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import {UnivService} from './univ.service';
import {CreateUnivDto} from './dto/create-univ.dto';
import {TransformInterceptor} from 'src/transform.interceptor';

@Controller('univ')
@UseInterceptors(TransformInterceptor)
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
