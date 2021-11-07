import {Controller, Get, Post, Body, Param, UseGuards} from '@nestjs/common';
import {UnivCommentService} from './univ-comment.service';
import {CreateUnivCommentDto} from './dto/create-univ-comment.dto';
import {JwtAuthGuard} from './../auth/guard/jwt-auth.guard';
import {User} from 'src/common/decorator/user.decorator';
import {ApiTags} from '@nestjs/swagger';
import {ApiDocs} from './univ-comment.docs';

@Controller('univ-comment')
@ApiTags('univ-comment')
export class UnivCommentController {
  constructor(private readonly univCommentService: UnivCommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiDocs.create('학교 댓글 생성 API')
  create(@User() user, @Body() createUnivCommentDto: CreateUnivCommentDto) {
    return this.univCommentService.create(user.id, createUnivCommentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':univId')
  @ApiDocs.findAllByUnivId('학교 댓글 조회 API')
  findAllByUnivId(@Param('univId') univId: string) {
    return this.univCommentService.findAllByUnivId(+univId);
  }
}
