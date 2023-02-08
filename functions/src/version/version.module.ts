// lib
import { Module } from '@nestjs/common'
import { VersionController } from '@/version/version.controller'
import { VersionService } from '@/version/version.service'

@Module({
  controllers: [VersionController],
  providers: [VersionService]
})
export class VersionModule {}
