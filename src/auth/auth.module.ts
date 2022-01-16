import {PassportModule} from '@nestjs/passport';
import {forwardRef, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from './strategy/jwt.strategy';
import {UserModule} from 'src/user/user.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from 'src/user/entities/user.entity';
import {HttpModule} from '@nestjs/axios';
import {Location} from 'src/location/entities/location.entity';
import {LocationModule} from 'src/location/location.module';
import {Univ} from './../univ/entities/univ.entity';
import {ConfigService, ConfigModule} from '@nestjs/config';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => LocationModule),
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          secret: config.get('auth').secret,
          signOptions: config.get('auth').signOptions,
        };
      },
      imports: [ConfigModule],
    }),
    TypeOrmModule.forFeature([User, Location, Univ]),
    HttpModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}
