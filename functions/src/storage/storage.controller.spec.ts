import { Test, TestingModule } from '@nestjs/testing'
import { StorageController } from '@/storage/storage.controller'

describe.skip('StorageController', () => {
  let controller: StorageController

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StorageController]
    }).compile()

    controller = module.get<StorageController>(StorageController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
