import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Put,
  Delete,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiResponse, ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt_strategy/jwt-auth.guard';
import { UpdateUserProfileParams } from './interface/user/updateUserProfile';
import { ParamsDto } from './models/dto/params';
import { ProjectDto } from './models/dto/projects';
//import { Auth } from '../roles/roles_decorators';

@ApiTags('Users Routes')
@Controller('api/users')
export class UserController {
  constructor(private userservice: UserService) {}

  // ##### USER LOGIC #####

  @ApiOperation({ summary: 'Get user profile by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User profile retrieved successfully',
    //type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  //@UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true, validateCustomDecorators: true }))
  @Get('/profile/:id')
  async getProfile(@Param() id: ParamsDto) {
    const user = await this.userservice.findOne(id.id);
    if (user) {
      return { code: HttpStatus.OK, user: user };
    } else {
      return { code: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }

  // A verifier
  //@UseGuards(JwtAuthGuard)
  @UsePipes(
    new ValidationPipe({ transform: true, validateCustomDecorators: true }),
  )
  @Put('/profile/update/:id')
  async updateUserInfos(
    @Param() id: ParamsDto,
    @Body() body: UpdateUserProfileParams,
  ) {
    const user = await this.userservice.updateProfile(id.id, body);
    if (user) {
      return { code: HttpStatus.OK, user: user };
    } else {
      return { code: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }

  @UsePipes(
    new ValidationPipe({ transform: true, validateCustomDecorators: true }),
  )
  @Delete('/profile/delete/:id')
  async deleteUser(@Param() id: ParamsDto) {
    const user = await this.userservice.deleteProfile(id.id);
    if (user) {
      return { code: HttpStatus.OK, user: user };
    } else {
      return { code: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }

  // ##### WISHLIST LOGIC ######

  @ApiTags('Wishlist Routes')
  @ApiOperation({ summary: 'Get user wishlist by ID' })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Wishlist retrieved successfully',
    //type: WishlistResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  //@UseGuards(JwtAuthGuard)
  @UsePipes(
    new ValidationPipe({ transform: true, validateCustomDecorators: true }),
  )
  @Get('/profile/wishlist/:id')
  async getWhishlist(@Param() id: ParamsDto) {
    const wish = await this.userservice.getUserWhishlist(id.id);
    if (wish) {
      return { code: HttpStatus.OK, wish: wish };
    } else {
      return { code: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }

  @ApiTags('Wishlist Routes')
  //@UseGuards(JwtAuthGuard)
  @UsePipes(
    new ValidationPipe({ transform: true, validateCustomDecorators: true }),
  )
  @Post('/profile/:userId/wishlist/:itemId')
  async addWhishlist(@Param() userId: ParamsDto, @Param() itemId: ParamsDto) {
    const wish = await this.userservice.updateWhishlist(userId.id, itemId.id);
    if (wish) {
      return { code: HttpStatus.OK, wish: wish };
    } else {
      return { code: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }

  @ApiTags('Wishlist Routes')
  //@UseGuards(JwtAuthGuard)
  @UsePipes(
    new ValidationPipe({ transform: true, validateCustomDecorators: true }),
  )
  @Delete('/profile/:userId/wishlist/:itemId')
  async deleteWhishlistItem(
    @Param() userId: ParamsDto,
    @Param() itemId: ParamsDto,
  ) {
    const wish = await this.userservice.deleteWhishlistItem(
      userId.id,
      itemId.id,
    );
    if (wish) {
      return { code: HttpStatus.OK, wish: wish };
    } else {
      return { code: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
  // ##### PROJECT LOGIC #######

  @ApiTags('Project Routes')
  @ApiOperation({ summary: 'Create a new project' })
  @ApiBody({ type: ProjectDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Project created successfully',
    //type: ProjectResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  //@UseGuards(JwtAuthGuard)
  // mettre en place la logic de role + oauth
  //@Auth('admin')
  @Post('/create')
  async createProjects(@Body() body:ProjectDto) {
    try {
      if (body) {
        const projects = await this.userservice.createProject(body);
        return {
          code: 200,
          projects: projects,
        };
      }
    } catch (error) {
      return { code: 500 };
    }
  }

  //@UseGuards(JwtAuthGuard)
  @ApiTags('Project Routes')
  @Get('/getUserProjects/:id')
  async getUserProjects(@Param() id) {
    try {
      if (id) {
        const projects = await this.userservice.allProjectsById(id);
        return {
          code: 200,
          projects: projects,
        };
      }
    } catch (error) {
      return { code: 500 };
    }
  }

  @ApiTags('Project Routes')
  @Get('/getUserProject/:id1/:id2')
  async getUserProject(@Param() id1, @Param() id2) {
    try {
      if (id1 && id2) {
        const projects = await this.userservice.getProjectById(id1.id, id2.id);
        return {
          code: 200,
          projects: projects,
        };
      }
    } catch (error) {
      return { code: 500 };
    }
  }

  @ApiTags('Project Routes')
  @Get('/getProjectItems/:id')
  async getUProjectItems(@Param() id) {
    try {
      if (id) {
        console.log('PROJECT = ');
        const projects = await this.userservice.getProjectItems(id.id);
        return {
          code: 200,
          projects: projects,
        };
      }
    } catch (error) {
      return { code: 500 };
    }
  }

  //@UseGuards(JwtAuthGuard)
  @ApiTags('Project Routes')
  @Post('/project/additem')
  async addProjectItem(@Body() body) {
    try {
      if (body) {
        const projects = await this.userservice.addProjectItem(body);
        return {
          code: 200,
          projects: projects,
        };
      }
    } catch (error) {
      return { code: 500 };
    }
  }

  //@UseGuards(JwtAuthGuard)
  @ApiTags('Project Routes')
  @Post('/project/addtouser')
  async addProjectToUser(@Body() body) {
    try {
      if (body) {
        const projects = await this.userservice.addProjectToUser(body);
        return {
          code: 200,
          projects: projects,
        };
      }
    } catch (error) {
      return { code: 500 };
    }
  }

  // ##### STYLIST LOGIC #######

  //@UseGuards(JwtAuthGuard)
  @ApiTags('Stylist Routes')
  @Post('/showroom/createStylist')
  async createStylist(@Body() body) {
    try {
      if (body) {
        const stylist = await this.userservice.createStylist(body);
        return {
          code: 200,
          projects: stylist,
        };
      }
    } catch (error) {
      return { code: 500 };
    }
  }

  // ##### TALENT LOGIC #######

  //@UseGuards(JwtAuthGuard)
  @ApiTags('Talent Routes')
  @Post('/showroom/createtalent')
  async createTalent(@Body() body) {
    try {
      if (body) {
        const talent = await this.userservice.createTalent(body);
        return {
          code: 200,
          projects: talent,
        };
      }
    } catch (error) {
      return { code: 500 };
    }
  }

  //@UseGuards(JwtAuthGuard)
  @ApiTags('Talent Routes')
  @Post('/showroom/addtalent')
  async addTalentToProject(@Body() body) {
    try {
      if (body) {
        const talent = await this.userservice.addTalentToProject(body);
        return {
          code: 200,
          projects: talent,
        };
      }
    } catch (error) {
      return { code: 500 };
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
