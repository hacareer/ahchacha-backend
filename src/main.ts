import {ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import {ServiceAccount} from 'firebase-admin';
import * as admin from 'firebase-admin';
import {AppModule} from './app.module';
import {HttpExceptionFilter} from './httpException.filter';
import {setupSwagger} from './swagger/index';
import {TransformInterceptor} from './transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  // app.use(cookieParser());

  const adminConfig: ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  };
  // Initialize the firebase admin app
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
    databaseURL: 'https://ahchacha-8f274-default-rtdb.firebaseio.com/',
  });
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  setupSwagger(app);
  await app.listen(3000);
}
bootstrap();
