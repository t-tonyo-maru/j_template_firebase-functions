// lib
import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'
// service
import { VersionService } from '@/version/version.service'

describe('VersionService', () => {
  let service: VersionService
  let config: ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VersionService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => 'v1.0.0')
          }
        }
      ]
    }).compile()

    service = module.get<VersionService>(VersionService)
    config = module.get<ConfigService>(ConfigService)
  })

  it('getVersion()の返り値のmessageがSUCCESSであること', () => {
    const { message } = service.getVersion()
    expect(message).toBe('SUCCESS')
  })

  it('getVersion()の返り値のversionの形式がvX.X.Xであること', () => {
    const { version } = service.getVersion()
    expect(version).toMatch(/^v\d+\.\d+\.\d+$/)
  })
})
