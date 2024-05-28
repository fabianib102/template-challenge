import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    
    if(request?.user){
        const user = request.user;
        if (user && user.role && roles.some(role => user.role.includes(role))) {
            return true;
          } else {
            throw new ForbiddenException('Access denied: You do not have the required role');
        }
    }else{
        throw new ForbiddenException('Access denied: You do not have the any role');
    }
  }
}
