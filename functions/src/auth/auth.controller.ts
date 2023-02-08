// lib
import { Controller, Body, Post } from '@nestjs/common'
// service
import { AuthService } from '@/auth/auth.service'
// dto
import { AuthLogoutDto } from '@/auth/dto/auth.dto'

@Controller({ version: ['1'], path: 'auth' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/revoke')
  async logout(@Body() auth: AuthLogoutDto) {
    return await this.authService.revokeTokens(auth.uid)
  }
}
