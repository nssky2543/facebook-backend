import { Injectable, ExecutionContext, CanActivate, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = this.getRequest(context);
    const token = this.extractToken(request);
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const payload = await this.verifyToken(token);
      request['user'] = payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }

  private getRequest(context: ExecutionContext): Request {
    return context.switchToHttp().getRequest();
  }

  private extractToken(request: Request): string | undefined {
    const authorizationHeader = request.headers.get('Authorization');
    const tokenMatch = authorizationHeader?.match(/^Bearer (.*)$/);
    return tokenMatch?.[1];
  }

  private async verifyToken(token: string): Promise<any> {
    return this.jwtService.verifyAsync(token, { secret: process.env.JWT_SECRET });
  }
}