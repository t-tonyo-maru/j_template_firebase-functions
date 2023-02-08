// lib
import { Controller, Get } from '@nestjs/common'
// service
import { VersionService } from '@/version/version.service'

@Controller('version')
export class VersionController {
  constructor(private readonly versionService: VersionService) {}

  @Get()
  getVersion() {
    return this.versionService.getVersion()
  }
}
