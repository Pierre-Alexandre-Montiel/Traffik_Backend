import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  /*canActivate(context: ExecutionContext) {
        console.log('LocalAuthGuard called');
        return super.canActivate(context);
    }*/
}
