import { PartialType } from '@nestjs/swagger';
import { CreateUnivCommentDto } from './create-univ-comment.dto';

export class UpdateUnivCommentDto extends PartialType(CreateUnivCommentDto) {}
