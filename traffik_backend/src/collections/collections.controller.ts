import { CollectionsService } from './collections.service';
import { Body, Controller, Delete, Get, Header, Headers, Param, Post, Request, Res, UploadedFile, UseGuards} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt_strategy/jwt-auth.guard';

@ApiTags('Collections Routes')
@Controller('collections')
export class CollectionsController {

    constructor(private collecservice:CollectionsService) {}

    @Get('items')
    @ApiOperation({summary:'get all items'})
    @ApiResponse({
        status:200,
        description:'all items', schema: {
            type: 'object',
            properties: {
                code: {
                    type: 'int',
                    example: '200',
                    description: 'Login sucess',
                },
                items:{
                    type: 'object',
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

    @Post('create')
    async createItems(@Body() body) 
    {
        try {
            if (body)
            {
                const items = await this.collecservice.createItems(body);
                return {code:200};
            }
        }
        catch(error)
        {
            return {code:500}
        } 
    }
}
