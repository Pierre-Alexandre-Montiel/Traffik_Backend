import { Body, Controller, Delete, Get, Header, Headers, Param, Post, Request, Res, UploadedFile, UseGuards} from '@nestjs/common';
import { OauthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local_strategy/local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { validate } from 'class-validator';
import { JwtAuthGuard } from './jwt_strategy/jwt-auth.guard';


@ApiTags('Auth Routes')
@Controller('auth')
export class OauthController {
    constructor(private authservice:OauthService) {}

    @Post('/create')
    @ApiOperation({summary:'create a user in the DB'})
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
        description:'User created', schema: {
            type: 'object',
            properties: {
                
            }
        }
    })
    async createUser(@Body() body) {
        try {
            if (body)
                console.log("email", body.email);
                console.log("password", body.password);
                const user = await this.authservice.createUser(body)
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

    @UseGuards(LocalAuthGuard)
    //@UseGuards(AuthGuard('local'))
    @Post('/login')
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
    async login(@Request() req) {
        return this.authservice.login(req.user);
    }


    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) 
    {
      return req.user;
    }
}