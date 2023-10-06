import { Controller, Get, Param, UseGuards} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt_strategy/jwt-auth.guard';

@ApiTags('Projects Routes')
@Controller('api/projects')
export class ProjectsController {
    constructor(private readonly projectService: ProjectsService) {}

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async getAllProjects(@Param() id) 
    {
        const projects = await this.projectService.allProjectsById(id);
        if (projects)
            return {code:200, projects: projects};
        else
            return {code:500};
    }
}
