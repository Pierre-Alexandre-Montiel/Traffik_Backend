import { CollectionsService } from './collections.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Headers,
  Param,
  Post,
  Request,
  Res,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt_strategy/jwt-auth.guard';

@ApiTags('Collections Routes')
@Controller('api/collections')
export class CollectionsController {
  constructor(private collecservice: CollectionsService) {}

  @Get('/items')
  @ApiOperation({ summary: 'get all items' })
  @ApiResponse({
    status: 200,
    description: 'all items',
    schema: {
      type: 'object',
      properties: {
        code: {
          type: 'int',
          example: '200',
          description: 'All Items sucess',
        },
        items: {
          type: 'object',
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'All Items not accessible',
    schema: {
      type: 'object',
      properties: {
        code: {
          type: 'int',
          example: '500',
          description: 'Items unsucess',
        },
      },
    },
  })
  async getItems(@Request() req) {
    try {
      if (req) {
        const items = await this.collecservice.allItems();
        return { code: 200, items: items };
      }
    } catch (error) {
      return { code: 500 };
    }
  }

  @Get('/item')
  @ApiOperation({ summary: 'get one item' })
  @ApiResponse({
    status: 200,
    description: 'one item',
    schema: {
      type: 'object',
      properties: {
        code: {
          type: 'int',
          example: '200',
          description: 'Item access',
        },
        items: {
          type: 'object',
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Item does not exist',
    schema: {
      type: 'object',
      properties: {
        code: {
          type: 'int',
          example: '500',
          description: 'Item access unsucess',
        },
      },
    },
  })
  async getOneItem(@Body() body) {
    try {
      if (body) {
        const item = await this.collecservice.oneItem(body);
        return { code: 200, item: item };
      }
    } catch (error) {
      return { code: 500 };
    }
  }

  @Post('/uploadpictures')
  async uploadPictures() {
    try{
      const item = await this.collecservice.uploadItemsImages("/Users/pierre-alexandremontiel/Desktop/TRAFFIK/traffik-os/traffik_backend/src/assets/inventory.csv");
      return { code: 200};
    }
    catch (error)
    {
      return {code : 500};
    } 
  }

  /*@Post('/create')
  async createItems(@Body() body) {
    try {
      if (body) {
        const items = await this.collecservice.createItems(body);
        return { code: 200 };
      }
    } catch (error) {
      return { code: 500 };
    }
  }*/

  @Post('/upload')
  async uploadInventory() {
    try {
        //await this.collecservice.downloadFileFromGoogleDrive(process.env.DEST);
        const items = await this.collecservice.importProductsFromCsv("/Users/pierre-alexandremontiel/Desktop/TRAFFIK/traffik-os/traffik_backend/src/assets/inventory.csv");
        return { code: 200 };
    } catch (error) {
      return { code: 500 };
    }
  }

  @Post('/search')
  async searchInventory(@Body() body) {
    try {
        //await this.collecservice.downloadFileFromGoogleDrive(process.env.DEST);
        const search = await this.collecservice.searchRequest(body);
        return { code: 200, search: search };
    } catch (error) {
      return { code: 500 };
    }
  }
}
