import {PartialType, ApiProperty} from '@nestjs/swagger';
import {CreateCheckUpDto} from './create-check-up.dto';
import {IsNumber} from 'class-validator';

export class UpdateCheckUpDto extends PartialType(CreateCheckUpDto) {}
