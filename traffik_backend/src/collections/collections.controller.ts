import { CollectionsService } from './collections.service';
import { Body, Controller, Delete, Get, Header, Headers, Param, Post, Request, Res, UploadedFile, UseGuards} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt_strategy/jwt-auth.guard';

@Controller('collections')
export class CollectionsController {

    constructor(private collecservice:CollectionsService) {}

    @UseGuards(JwtAuthGuard)
    @Get('items')
    @ApiOperation({summary:'get all items'})
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
    async getItems(@Request() req) 
    {
        try {
            if (req)
            {
                const items = await this.collecservice.allItems();
                return {code:200, items:items};
            }
        }
        catch(error)
        {
            return {code:500}
        } 
    }
}
