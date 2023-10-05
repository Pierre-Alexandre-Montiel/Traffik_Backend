import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserLog } from '../users/models/Login';
import { LoginDto } from './dto/login'
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {UnauthorizedException} from '@nestjs/common';


@Injectable()
export class OauthService {
    constructor(
		private prisma: PrismaService,
        private jwtService: JwtService
    ){}

    async createUser(body: any): Promise<LoginDto> 
    {
      const response = await body as LoginDto;
      const salt = await bcrypt.genSalt();
      const pwd = response.password;
      response.password = await bcrypt.hash(pwd, salt);
      return await this.prisma.user.create({data:response});
    }

    async logUser(body: any): Promise<UserLog> 
    {
      const response = await body as UserLog;
      return await this.prisma.user.create({data:response});
    }

    async jwtGeneration(user: any)
    {
        const payload = { sub: user.id};
        const jwt_token= this.jwtService.sign(payload);
        if (!jwt_token) 
        {
          throw new UnauthorizedException();
        }
        return jwt_token;
    }

    async findUser(body:any)
    {
      return await this.prisma.user.findFirst();
    }

    async findOne(email: string)
    {
      return await this.prisma.user.findFirst(
        {
          where: 
          {
            email
          }
      });
    }

    async findUserByIdDb(id: number){
        const user = await this.prisma.user.findUnique({
            where: {
                id
            }
        });
        if (user)
          return user;
        return false;
      };
    
    async validateUser(email: string, password: string)
    {
        const user = await this.findOne(email);
        const res = bcrypt.compare(password, user.password);
        if (user && res)
        {
            const {password, ...rest} = user;
            return rest;
        }
        return null;
    }

    async login(user: any) {
      const payload = { email: user.email, sub: user.email };
      console.log("Payload email = ", payload.email);
      console.log("Payload id = ", payload.sub);
      return {
        access_token: this.jwtService.sign(payload, { secret: process.env.SECRET_JWT}),
      };
    }
}