// lib
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class VersionService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * バージョンを取得する
   *
   * @return {{message: string; version: string }}
   */
  getVersion() {
    return {
      message: 'SUCCESS',
      version: this.configService.get<string>('version')!
    }
  }
}
