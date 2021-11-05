import {Module, forwardRef} from '@nestjs/common';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import {AuthService} from './../auth/auth.service';
import {AuthModule} from 'src/auth/auth.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entities/user.entity';

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
