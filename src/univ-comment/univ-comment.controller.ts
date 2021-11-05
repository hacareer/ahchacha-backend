import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import {UnivCommentService} from './univ-comment.service';
import {CreateUnivCommentDto} from './dto/create-univ-comment.dto';
import {JwtAuthGuard} from './../auth/guard/jwt-auth.guard';
import {User} from 'src/common/decorator/user.decorator';

@Controller('univ-comment')
export class UnivCommentController {
  constructor(private readonly univCommentService: UnivCommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@User() user, @Body() createUnivCommentDto: CreateUnivCommentDto) {
    return this.univCommentService.create(user, createUnivCommentDto);
  }

  @Get(':univId')
  findByUnivId(@Param('univId') univId: string) {
    return this.univCommentService.findByUnivId(+univId);
  }
}
