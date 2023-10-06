import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectsService {
    constructor(private prisma: PrismaService) {}

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
}
