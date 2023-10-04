import { Body, Controller, Delete, Get, Header, Headers, Param, Post, Request, Res, UploadedFile, UseGuards} from '@nestjs/common';
import { OauthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './local_strategy/local-auth.guard';
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
                code: {
                    type: 'int',
                    example: '200',
                    description: 'user created',
                }, 
            }
        } 
    })
    @ApiResponse({
        status:500,
        description:'User not created', schema: {
            type: 'object',
            properties: {
                code: {
                    type: 'int',
                    example: '500',
                    description: 'user not created',
                }, 
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
                    code: 200, user:user
                };
        }
        catch(error)
        {
            console.log(error);
            return{code:500}
        }
    }

    @UseGuards(LocalAuthGuard)
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
        description:'User Login', schema: {
            type: 'object',
            properties: {
                code: {
                    type: 'int',
                    example: '200',
                    description: 'Login sucess',
                },
                accesstoken:{
                    type: 'string',
                }
            }
        } 
    })
    @ApiResponse({
        status:500,
        description:'User not Login', schema: {
            type: 'object',
            properties: {
                code: {
                    type: 'int',
                    example: '500',
                    description: 'Login unsucess',
                },
            }
        } 
    })
    async login(@Request() req) 
    {
        try {
            if (req)
            {
                const token = await this.authservice.login(req.user);
                return {code:200,token}
            }
        }
        catch(error)
        {
            return {code:500}
        }
    }


    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @ApiOperation({summary:'get user'})
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                bearertoken: {
                    type: 'string',
                },
            }
        }
    })
    @ApiResponse({
        status:200,
        description:'User Login', schema: {
            type: 'object',
            properties: {
                code: {
                    type: 'int',
                    example: '200',
                    description: 'Login sucess',
                },
                accesstoken:{
                    type: 'string',
                }
            }
        } 
    })
    @ApiResponse({
        status:500,
        description:'User not Login', schema: {
            type: 'object',
            properties: {
                code: {
                    type: 'int',
                    example: '500',
                    description: 'Login unsucess',
                },
            }
        } 
    })
    async getProfile(@Request() req) 
    {
        try {
            if (req)
            {
                return {code:200, user:req.user};
            }
        }
        catch(error)
        {
            return {code:500}
        } 
    }
}