import {Module, forwardRef} from '@nestjs/common';
import {UnivCommentService} from './univ-comment.service';
import {UnivCommentController} from './univ-comment.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UnivComment} from 'src/univ-comment/entities/univ-comment.entity';
import {Univ} from './../univ/entities/univ.entity';
import {User} from 'src/user/entities/user.entity';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from './../auth/strategy/jwt.strategy';
import {UserModule} from './../user/user.module';
import {AuthModule} from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User, UnivComment, Univ]),
  ],
  controllers: [UnivCommentController],
  providers: [UnivCommentService],
})
export class UnivCommentModule {}
