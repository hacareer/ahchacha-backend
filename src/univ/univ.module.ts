import {Module} from '@nestjs/common';
import {UnivService} from './univ.service';
import {UnivController} from './univ.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Univ} from './entities/univ.entity';
import {User} from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Univ, User])],
  controllers: [UnivController],
  providers: [UnivService],
})
export class UnivModule {}
