import {PartialType} from '@nestjs/swagger';
import {CreateCheckUpDto} from './create-check-up.dto';

export class UpdateCheckUpDto extends PartialType(CreateCheckUpDto) {}
