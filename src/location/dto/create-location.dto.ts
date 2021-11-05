import {User} from 'src/user/entities/user.entity';
import {IsString, IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: '반포역', description: '사용자 주소(도로명)'})
  address: string;
}
