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
import {ApiTags} from '@nestjs/swagger';
import {ApiDocs} from './clinic-comment.docs';

@Controller('clinic-comment')
@ApiTags('clinic-comment')
export class ClinicCommentController {
  constructor(private readonly clinicCommentService: ClinicCommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  @ApiDocs.createClinicComment('선별진료소 후기 생성 API')
  createClinicComment(
    @User() user,
    @Body() createClinicCommentDto: CreateClinicCommentDto,
  ) {
    return this.clinicCommentService.createClinicComment(
      user.id,
      createClinicCommentDto,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('clinic/:clinicId')
  @ApiDocs.countContents('선별진료소 후기 개수 조회 API ')
  countContents(@Param('clinicId') clinicId: number) {
    return this.clinicCommentService.countContents(clinicId);
  }
}
