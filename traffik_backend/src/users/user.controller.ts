import { Body, Controller, Delete, Get, Header, Headers, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors, StreamableFile, UsePipes, ValidationPipe} from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { crossOriginEmbedderPolicy } from 'helmet';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users Routes')
@Controller('users')
export class UserController {
    constructor(private userservice:UserService) {}

    @Post('/create')
    async createProjects(@Body() body) {
        try {
            if (body)
            {
                const projects = await this.userservice.createProject(body)
                return {
                    code: 200, projects : projects
                };
            }
        }
        catch(error)
        {
            console.log(error);
            return{code:500}
        }
    }

    @Get('/get')
    async getProjects(@Body() body) {
        try {
            if (body)
            {
                const projects = await this.userservice.allProjectsById(body.id)
                return {
                    code: 200, projects : projects
                };
            }
        }
        catch(error)
        {
            console.log(error);
            return{code:500}
        }
    }

    /*@Post('/login')
    @ApiOperation({summary:'login a user'})
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: {
                    type: 'sting',
                    example: 'Wanis@gmail.com',
                    description: 'user account email',
                },
                password: {
                    type: 'string',
                    example: '0000',
                    description: 'user account password',
                }
            }
        }
    })
    @ApiResponse({
        status:200,
        description:'User login', schema: {
            type: 'object',
            properties: {
                
            }
        }
    })
    async logUser(@Body() body) {
        try {
            if (body)
                console.log("Body", body.firstName);
                const user = await this.userservice.logUser(body)
                return {
                    code: 200
                };
        }
        catch(error)
        {
            console.log(error);
            return{code:500}
        }
    }*/
}