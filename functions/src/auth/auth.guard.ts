// lib
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common'
import { Request } from 'express'
// service
import { AuthService } from '@/auth/auth.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest()
    const rowToken = request.headers.authorization
    if (!rowToken) {
      throw new UnauthorizedException()
    }
    const token = rowToken.replace('Bearer ', '')
    return await this.authService.verifyToken(token)
  }
}
