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
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt_strategy/jwt-auth.guard';
//import { Auth } from '../roles/roles_decorators';

@ApiTags('Users Routes')
@Controller('api/users')
export class UserController {
  constructor(private userservice: UserService) {}

  // ##### USER LOGIC #####

  @UseGuards(JwtAuthGuard)
  @Get('/profile/:id')
  async getProfile(@Param() id) {
    const user = await this.userservice.findOne(id.id);
    if (user) {
      return { code: HttpStatus.OK, user: user };
    } else {
      return { code: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('/profile/:id')
  // async profileUpdate(@Param() id, @Body() body) {
  //   const user = await this.userservice.updateProfile(id, body);
  //   if (user) return { code: 200, user: user };
  //   else return { code: 500 };
  // }

  // A verifier
  //@UseGuards(JwtAuthGuard)
  @Put('/profile/update/:id')
  async updateUserInfos(@Param() id, @Body() body) {
    const user = await this.userservice.updateProfile(id.id, body);
    if (user) return { code: 200, user: user };
    else return { code: 500 };
  }

  // ##### WISHLIST LOGIC ######

  @ApiTags('Wishlist Routes')
  @UseGuards(JwtAuthGuard)
  @Get('/profile/whishlist/:id')
  async getWhishlist(@Param() id) {
    const wish = await this.userservice.getUserWhishlist(id.id);
    if (wish) return { code: 200, whishlist: wish };
    else return { code: 500 };
  }

  @ApiTags('Wishlist Routes')
  @UseGuards(JwtAuthGuard)
  @Post('/profile/:userId/whishlist/:itemId')
  async addWhishlist(@Param() userId, @Param() itemId) {
    const wish = await this.userservice.updateWhishlist(userId.id, itemId.id);
    if (wish) return { code: 200, whishlist: wish };
    else return { code: 500 };
  }

  @ApiTags('Wishlist Routes')
  @UseGuards(JwtAuthGuard)
  @Delete('/profile/:userId/whishlist/:itemId')
  async deleteWhishlistItem(@Param() userId, @Param() itemId) {
    const wish = await this.userservice.deleteWhishlistItem(
      userId.id,
      itemId.id,
    );
    if (wish) return { code: 200, whishlist: wish };
    else return { code: 500 };
  }
  // ##### PROJECT LOGIC #######

  @ApiTags('Project Routes')
  //@UseGuards(JwtAuthGuard)
  // mettre en place la logic de role + oauth
  //@Auth('admin')
  @Post('/create')
  async createProjects(@Body() body) {
    try {
      if (body) {
        const projects = await this.userservice.createProject(body);
        return {
          code: 200,
          projects: projects,
        };
      }
    } catch (error) {
      console.log('ici');
      console.log(error);
      return { code: 500 };
    }
  }

  //@UseGuards(JwtAuthGuard)
  @ApiTags('Project Routes')
  @Get('/getUserProjects/:id')
  async getUserProjects(@Param() id) {
    console.log('ICI');
    try {
      if (id) {
        const projects = await this.userservice.allProjectsById(id);
        return {
          code: 200,
          projects: projects,
        };
      }
    } catch (error) {
      console.log(error);
      return { code: 500 };
    }
  }

  @ApiTags('Project Routes')
  @Get('/getUserProject/:id1/:id2')
  async getUserProject(@Param() id1, @Param() id2) {
    try {
      if (id1 && id2) {
        console.log('PROJECT = ');
        const projects = await this.userservice.getProjectById(id1.id, id2.id);
        return {
          code: 200,
          projects: projects,
        };
      }
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
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
      console.log(error);
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
