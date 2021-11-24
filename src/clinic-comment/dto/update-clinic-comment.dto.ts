import {PartialType} from '@nestjs/swagger';
import {CreateClinicCommentDto} from './create-clinic-comment.dto';

export class UpdateClinicCommentDto extends PartialType(
  CreateClinicCommentDto,
) {}
