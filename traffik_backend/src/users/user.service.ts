import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserLog } from './models/Login';

@Injectable()
export class UserService {
    constructor(
		private prisma: PrismaService
    ){}

    async createUser(body: any): Promise<UserLog> {
        const response = await body as UserLog;
      return await this.prisma.user.create({data:response});
    }

    async findUser(body:any) {
      return await this.prisma.user.findFirst();
    }
}