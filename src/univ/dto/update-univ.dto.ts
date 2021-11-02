import { PartialType } from '@nestjs/swagger';
import { CreateUnivDto } from './create-univ.dto';

export class UpdateUnivDto extends PartialType(CreateUnivDto) {}
