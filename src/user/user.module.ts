import {Module, forwardRef} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {AuthModule} from 'src/auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {Univ} from 'src/univ/entities/univ.entity';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, Univ]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
