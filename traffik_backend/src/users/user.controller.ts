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
    @ApiOperation({summary:'create a user in the DB'})
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                firstName: {
                    type: 'string',
                    example: 'Wanis',
                    description: 'user account firstname',
                },
                lastName: {
                    type: 'string',
                    example: 'Hamoumi',
                    description: 'user account lastname',
                }
            }
        }
    })
    @ApiResponse({
        status:200,
        description:'User created'
    })
    async createUser(@Body() body) {
        try {
            if (body)
                console.log("Body", body.firstName);
                const user = await this.userservice.createUser(body)
                return {
                    code: 200
                };
        }
        catch(error)
        {
            console.log(error);
            return{code:500}
        }
    }
}