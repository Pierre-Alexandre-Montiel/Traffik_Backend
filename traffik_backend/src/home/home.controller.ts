import { Controller } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Home Routes')
@Controller('home')
export class HomeController {}
