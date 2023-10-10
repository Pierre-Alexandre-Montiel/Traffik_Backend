import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserLog } from './models/Login';
import { LoginDto } from '../auth/dto/login';
import * as bcrypt from 'bcrypt';
import { ProjectDto } from './dto/projects';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(body: any): Promise<LoginDto> {
    const response = (await body) as LoginDto;
    const salt = await bcrypt.genSalt();
    const pwd = response.password;
    response.password = await bcrypt.hash(pwd, salt);
    return await this.prisma.user.create({ data: response });
  }

  async updateProfile(id: string, body) {
    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
         email: body.email,
         firstName: body.firstName,
         lastName: body.lastName,
        }
    });
    if (user)
      return user;
    return null;
  }

  async createProject(body: any): Promise<ProjectDto> {
    const response = (await body) as ProjectDto;
    return await this.prisma.project.create({ data: response });
  }

  async findUser(body: any) {
    return await this.prisma.user.findFirst();
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async allProjectsById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: { Project: true },
    });
    console.log('PROJECT = ', user);
    if (user != undefined) return user.Project;
    return null;
  }

  async getUserWhishlist(id: string) {
    const user = await this.prisma.wishlist.findMany({
      where: {
        userId: id,
      },
      include: { product: true },
    });
    if (user != undefined) 
      return user;
    return null;
  }

  async updateWhishlist(id: string, body:any) {
    const user = await this.prisma.wishlist.create({
      data: {
        userId: body,
        productId: id,
      }
    });
    if (user)
      return user;
    return null;
  }
}
