import { PartialType } from '@nestjs/swagger';
import { CreateSecondDoseDto } from './create-second-dose.dto';

export class UpdateSecondDoseDto extends PartialType(CreateSecondDoseDto) {}
