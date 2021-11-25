import {Module, forwardRef} from '@nestjs/common';
import {UnivService} from './univ.service';
import {UnivController} from './univ.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Univ} from './entities/univ.entity';
import {User} from 'src/user/entities/user.entity';
import {AuthModule} from './../auth/auth.module';
import {UserModule} from './../user/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Univ, User]),
  ],
  controllers: [UnivController],
  providers: [UnivService],
})
export class UnivModule {}
