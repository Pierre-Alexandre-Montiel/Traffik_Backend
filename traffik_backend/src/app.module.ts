import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './users/user.module';
import { OauthModule } from './auth/auth.module';
import { CollectionsModule } from './collections/collections.module';
import { HomeModule } from './home/home.module';

@Module({
  imports: [
    OauthModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CollectionsModule,
    HomeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
