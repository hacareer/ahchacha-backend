import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {ClinicCommentService} from './clinic-comment.service';
import {CreateClinicCommentDto} from './dto/create-clinic-comment.dto';
import {UpdateClinicCommentDto} from './dto/update-clinic-comment.dto';

@Controller('clinic-comment')
export class ClinicCommentController {
  constructor(private readonly clinicCommentService: ClinicCommentService) {}

  @Post()
  create(@Body() createClinicCommentDto: CreateClinicCommentDto) {
    return this.clinicCommentService.create(createClinicCommentDto);
  }

  @Get()
  findAll() {
    return this.clinicCommentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clinicCommentService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClinicCommentDto: UpdateClinicCommentDto,
  ) {
    return this.clinicCommentService.update(+id, updateClinicCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clinicCommentService.remove(+id);
  }
}
