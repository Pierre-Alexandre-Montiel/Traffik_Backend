import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserLog } from './models/Login';
import { LoginDto } from './dto/login'
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    constructor(
		private prisma: PrismaService
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

    async findUser(body:any) 
    {
      return await this.prisma.user.findFirst();
    }

    async findOne(id: number)
    {
      return await this.prisma.user.findUnique(
        {
          where: 
          {
            id
          }
      });
    }
}