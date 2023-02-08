// lib
import { Module } from '@nestjs/common'
// module
import { AuthModule } from '@/auth/auth.module'
import { FirebaseModule } from '@/firebase/firebase.module'
// controller / service
import { StorageController } from '@/storage/storage.controller'
import { StorageService } from '@/storage/storage.service'

@Module({
  imports: [AuthModule, FirebaseModule],
  providers: [StorageService],
  controllers: [StorageController]
})
export class StorageModule {}
