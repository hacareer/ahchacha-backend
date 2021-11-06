import { PartialType } from '@nestjs/swagger';
import { CreateCheckUpResultDto } from './create-check-up-result.dto';

export class UpdateCheckUpResultDto extends PartialType(CreateCheckUpResultDto) {}
