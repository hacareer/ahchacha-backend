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
import {UnivCommentService} from './univ-comment.service';
import {CreateUnivCommentDto} from './dto/create-univ-comment.dto';

@Controller('univ-comment')
export class UnivCommentController {
  constructor(private readonly univCommentService: UnivCommentService) {}

  @Post()
  create(@Req() req, @Body() createUnivCommentDto: CreateUnivCommentDto) {
    return this.univCommentService.create(req.user, createUnivCommentDto);
  }

  @Get(':univId')
  findByUniv() {
    return this.univCommentService.findByUniv();
  }
}
