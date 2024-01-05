import {
  Body,
  Injectable,
  Post,
  Patch,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserLog } from './models/Login';
import { LoginDto } from '../auth/dto/login';
import * as bcrypt from 'bcrypt';
import { ProjectDto } from './models/dto/projects';
import { TalentDto } from './models/dto/talent';
import { AddTalentToProjectParams } from './interface/talent/addTalentToProject';
import { AddItemsToProjectParams } from './interface/project/addItemsToProject';
import { CreateTalentParams } from './interface/talent/createTalent';
import { CreateUserParams } from './interface/user/CreateUser';
import { CreateProjectParams } from './interface/project/createProject';
import { AddProjectToUserParams } from './interface/project/addProjectToUser';
import { UpdateUserProfileParams } from './interface/user/updateUserProfile';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  //##### USER LOGIC ######

  @Post('createUser')
  async createUser(body: CreateUserParams): Promise<LoginDto> {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(body.password, salt);
      const response: LoginDto = { ...body, password: hashedPassword };
      return await this.prisma.user.create({ data: response });
    } catch (error) {
      throw new Error('Unable to create user.');
    }
  }

  @Patch('updateProfile/:id')
  async updateProfile(id: string, body: UpdateUserProfileParams) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          email: body.email,
          firstName: body.firstName,
          lastName: body.lastName,
        },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found.`);
      }
      return user;
    } catch (error) {
      throw new Error('Unable to update user profile.');
    }
  }

  @Delete('deleteProfile/:id')
  async deleteProfile(id: string) {
    try {
      const user = await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found.`);
      }
      return user;
    } catch (error) {
      console.log(error)
      throw new Error('Unable to delete user profile.');
    }
  }
  //#### STYLIST LOGIC #####

  async createStylist(body: any): Promise<LoginDto> {
    try {
      const response = (await body) as LoginDto;
      const salt = await bcrypt.genSalt();
      const pwd = response.password;
      response.password = await bcrypt.hash(pwd, salt);
      return await this.prisma.user.create({ data: response });
    } catch (error) {
      throw new Error('Unable to create stylist profile.');
    }
  }

  //#### TALENT LOGIC #####

  async createTalent(body: CreateTalentParams): Promise<TalentDto> {
    try {
      return await this.prisma.talents.create({ data: body });
    } catch (error) {
      throw new Error('Unable to create talent.');
    }
  }

  async addTalentToProject(body: AddTalentToProjectParams) {
    try {
      const project = await this.prisma.project.update({
        where: {
          id: body.projectId,
        },
        data: {
          Talent: { connect: { id: body.talentId } },
        },
      });
      if (!project) {
        throw new NotFoundException(
          `Project with ID ${body.projectId} not found.`,
        );
      }
      return project;
    } catch (error) {
      throw new Error('Unable to add talent to the project.');
    }
  }

  async deleteTalentOfProject(body: AddTalentToProjectParams) {
    try {
      const project = await this.prisma.project.deleteMany({
        where: {
          projectId: body.projectId,
          talentId: body.talentId,
        },
      });
      if (!project) {
        throw new NotFoundException(
          `Project with ID ${body.projectId} not found.`,
        );
      }
      return project;
    } catch (error) {
      throw new Error('Unable to add talent to the project.');
    }
  }

  //#### PROJECT LOGIC ######

  async createProject(body: CreateProjectParams): Promise<ProjectDto> {
    try {
      return await this.prisma.project.create({ data: body });
    } catch (error) {
      throw new Error('Unable to create project.');
    }
  }

  async addProjectItem(body: AddItemsToProjectParams) {
    try {
      const project = await this.prisma.project.update({
        where: {
          id: body.id,
        },
        data: {
          items: { connect: { barcode: body.barcode } },
        },
      });
      if (!project) {
        throw new NotFoundException(`Project with ID ${body.id} not found.`);
      }
      return project;
    } catch (error) {
      throw new Error('Unable to add item to project.');
    }
  }

  async addProjectToUser(body: AddProjectToUserParams) {
    const project = await this.prisma.user.update({
      where: {
        id: body.id,
      },
      data: {
        Project: { connect: { id: body.projectId } },
      },
    });
    if (project) return project;
    return null;
  }

  async getProjectItems(id: string) {
    const items = await this.prisma.project.findUnique({
      where: {
        id: id,
      },
      include: { items: true },
    });
    if (items.items) return items.items;
    return null;
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

  async allProjectsById(id) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id.id,
      },
      include: { Project: true },
    });
    console.log('PROJECT = ', user);
    if (user != undefined) return user.Project;
    return null;
  }

  async getProjectById(id1: string, id2: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: id2,
      },
      include: {
        User: {
          where: {
            id: id1,
          },
        },
      },
    });
    if (project != undefined) {
      console.log('PROJECT = ', project);
      return project;
    }
    return null;
  }

  //##### WISHLISt LOGIC #####

  async getUserWhishlist(id: string) {
    const user = await this.findOne(id)
    if (!user) {
        throw new NotFoundException(`User with ID ${id} not found.`);
      }
    try{
      const wish = await this.prisma.wishlist.findMany({
        where: {
          userId: id,
        },
        include: { product: true },
      });
      return wish;
    } catch (error) {
      throw new Error('Unable to get wishlist.');
    }
  }

  async updateWhishlist(userId: string, itemId: string) {
    const wish = await this.prisma.wishlist.createMany({
      data: {
        userId: userId,
        productId: itemId,
      },
    });
    if (wish) return wish;
    return null;
  }

  async deleteWhishlistItem(userId: string, itemId: string) {
    const wish = await this.prisma.wishlist.deleteMany({
      where: {
        userId: userId,
        productId: itemId,
      },
    });
    if (wish) return wish;
    return null;
  }
}
