import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Inject} from '@nestjs/common';
import { OauthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) 
{
  constructor(
  private Oauthservice: OauthService) {
      super({usernameField: 'email',
    });
  }

  async validate(email: string, password: string) 
  {
    const user = await this.Oauthservice.validateUser(email, password);  
    if (!user)
    {
      throw new UnauthorizedException();
    }
    return user;
  }
}