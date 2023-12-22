import { Controller } from '@nestjs/common';
import { UserService } from '../../user.service';
import { ShowroomService } from './showroom.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt_strategy/jwt-auth.guard';

@ApiTags('Showroom Routes')
@Controller('api/showroom')
export class ShowroomController {
  constructor(
    private userservice: UserService,
    private showroomservice: ShowroomService,
  ) {}
}
