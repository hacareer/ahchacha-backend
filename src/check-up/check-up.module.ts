import {Module, forwardRef} from '@nestjs/common';
import {CheckUpService} from './check-up.service';
import {CheckUpController} from './check-up.controller';
import {UserModule} from 'src/user/user.module';
import {AuthModule} from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => UserModule), forwardRef(() => AuthModule)],
  controllers: [CheckUpController],
  providers: [CheckUpService],
})
export class CheckUpModule {}
