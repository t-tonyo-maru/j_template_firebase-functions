import { Test, TestingModule } from '@nestjs/testing'
import { FirebaseService } from '@/firebase/firebase.service'

describe.skip('FirebaseService', () => {
  let service: FirebaseService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FirebaseService]
    }).compile()

    service = module.get<FirebaseService>(FirebaseService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
