// lib
import { Module } from '@nestjs/common'
// module
import { FirebaseModule } from '@/firebase/firebase.module'
// controller / service
import { AuthService } from '@/auth/auth.service'
import { AuthController } from '@/auth/auth.controller'

@Module({
  imports: [FirebaseModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
