import {PartialType, ApiProperty} from '@nestjs/swagger';
import {CreateCheckUpDto} from './create-check-up.dto';
import {IsNumber} from 'class-validator';
import {BaseUpdateResponseDto} from './../../common/dto/base-update-response.dto';

export class UpdateCheckUpDto extends PartialType(CreateCheckUpDto) {}

export class UpdateCheckUpResponseBodyDto extends BaseUpdateResponseDto {}
