import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UnivCommentService } from './univ-comment.service';
import { CreateUnivCommentDto } from './dto/create-univ-comment.dto';
import { UpdateUnivCommentDto } from './dto/update-univ-comment.dto';

@Controller('univ-comment')
export class UnivCommentController {
  constructor(private readonly univCommentService: UnivCommentService) {}

  @Post()
  create(@Body() createUnivCommentDto: CreateUnivCommentDto) {
    return this.univCommentService.create(createUnivCommentDto);
  }

  @Get()
  findAll() {
    return this.univCommentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.univCommentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUnivCommentDto: UpdateUnivCommentDto,
  ) {
    return this.univCommentService.update(+id, updateUnivCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.univCommentService.remove(+id);
  }
}
