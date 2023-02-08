// lib
import { Test, TestingModule } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'
// service
import { VersionService } from '@/version/version.service'
// controller
import { VersionController } from '@/version/version.controller'

describe('VersionController', () => {
  let controller: VersionController

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
      ],
      controllers: [VersionController]
    }).compile()

    controller = module.get<VersionController>(VersionController)
  })

  it('getVersion()の返り値のmessageがSUCCESSであること', () => {
    const { message } = controller.getVersion()
    expect(message).toBe('SUCCESS')
  })
  it('getVersion()の返り値のversionの形式がvX.X.Xであること', () => {
    const { version } = controller.getVersion()
    expect(version).toMatch(/^v\d+\.\d+\.\d+$/)
  })
})
