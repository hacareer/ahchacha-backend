import {Injectable} from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const time = new Date();
    return `Server Running, Time is ${time}`;
  }
}
