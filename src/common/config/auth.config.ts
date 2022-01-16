import {registerAs} from '@nestjs/config';

export default registerAs('auth', () => {
  return {
    secret: process.env.JWT_SECRET_KEY,
    aes_key: process.env.AES_KEY,
    accessTokenExp: '15m',
    refreshTokenExp: '60d',
  };
});
