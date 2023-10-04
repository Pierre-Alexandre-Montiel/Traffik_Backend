import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { OauthController } from './auth.controller';
import { OauthService } from './auth.service';
import { LocalStrategy } from './local_strategy/local.strategy'
import { JwtStrategy } from './jwt_strategy/jwt.strategy';

@Module({
  imports: [
    PrismaModule, PassportModule, JwtModule.register({
      secret: process.env.SECRET_JWT,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [OauthController],
  providers: [OauthService, PrismaService, JwtService, LocalStrategy, JwtStrategy],
})
export class OauthModule {}