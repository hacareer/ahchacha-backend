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
  UseInterceptors,
} from '@nestjs/common';
import {UnivCommentService} from './univ-comment.service';
import {CreateUnivCommentDto} from './dto/create-univ-comment.dto';
import {JwtAuthGuard} from './../auth/guard/jwt-auth.guard';
import {User} from 'src/common/decorator/user.decorator';
import {TransformInterceptor} from 'src/transform.interceptor';

@Controller('univ-comment')
@UseInterceptors(TransformInterceptor)
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
