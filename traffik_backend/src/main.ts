import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import * as csurf from 'csurf';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //const configService = app.get(ConfigService);
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:8080'],
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
  });
  app.use(helmet.noSniff());
  app.use(helmet.contentSecurityPolicy());
  app.use(helmet.xssFilter());
  const config = new DocumentBuilder()
    .setTitle('Traffik')
    .setDescription('Traffik API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  //await app.listen(configService.get('APP_PORT'));
  await app.listen(8080);
}
bootstrap();
