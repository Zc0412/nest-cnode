import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_ADMIN_KEY } from './decorators/roles.decorator';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAdmin = this.reflector.getAllAndOverride(IS_ADMIN_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isAdmin) {
      const request = context.switchToHttp().getRequest();
      const token = RolesGuard.extractTokenFromHeader(request);
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: jwtConstants.secret,
        });
        // 登录名为ADMIN_NAME时为管理员
        if (payload.username === process.env.ADMIN_NAME) {
          request['user'] = { ...request.user, roles: 'ADMIN' };
        } else {
          throw new ForbiddenException();
        }
      } catch {
        throw new ForbiddenException();
      }
      return true;
    }
    return true;
  }

  private static extractTokenFromHeader(request: Request): string | undefined {
    // 是否携带token
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
