// lib
import { IsString, IsNotEmpty } from 'class-validator'

export class AuthLogoutDto {
  @IsString()
  @IsNotEmpty()
  uid!: string
}
