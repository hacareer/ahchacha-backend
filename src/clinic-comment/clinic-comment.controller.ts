import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {JwtAuthGuard} from 'src/auth/guard/jwt-auth.guard';
import {User} from 'src/common/decorator/user.decorator';
import {ClinicCommentService} from './clinic-comment.service';
import {CreateClinicCommentDto} from './dto/create-clinic-comment.dto';
import {UpdateClinicCommentDto} from './dto/update-clinic-comment.dto';

@Controller('clinic-comment')
export class ClinicCommentController {
  constructor(private readonly clinicCommentService: ClinicCommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@User() user, @Body() createClinicCommentDto: CreateClinicCommentDto) {
    return this.clinicCommentService.create(user, createClinicCommentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':clinicId')
  countContents(@Param('clinicId') clinicId: string) {
    return this.clinicCommentService.countContents(+clinicId);
  }
}
