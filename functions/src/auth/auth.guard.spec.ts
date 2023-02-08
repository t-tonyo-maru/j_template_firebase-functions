// lib
import { TestingModule, Test } from '@nestjs/testing'
import { ConfigService } from '@nestjs/config'
// guard
import { AuthGuard } from '@/auth/auth.guard'
// module
// import { FirebaseModule } from '@/firebase/firebase.service'
// service
import { FirebaseService } from '@/firebase/firebase.service'
import { AuthService } from '@/auth/auth.service'
// controller
import { AuthController } from '@/auth/auth.controller'

describe.skip('AuthGuard', () => {
  let authService: AuthService
  let authGuard: AuthGuard

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [FirebaseModule],
      providers: [
        FirebaseService,
        AuthService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'firebaseCredentials.projectId') {
                return 'testFirebaseProjectId'
              } else if (key === 'firebaseCredentials.clientEmail') {
                return 'testFirebaseClientEmail'
              } else if (key === 'firebaseCredentials.privateKey') {
                return 'testFirebasePrivateKey'
              } else {
                return null
              }
            })
          }
        }
      ],
      controllers: [AuthController],
      exports: [AuthService]
    }).compile()

    authService = module.get<AuthService>(AuthService)
    authGuard = new AuthGuard(authService)
  })

  it('should be defined', () => {
    expect(authGuard).toBeDefined()
  })
})
