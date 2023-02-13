// lib
import { TestingModule, Test } from '@nestjs/testing'
import { ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createMock } from '@golevelup/ts-jest'
// guard
import { AuthGuard } from '@/auth/auth.guard'
// service
import { FirebaseService } from '@/firebase/firebase.service'
import { AuthService } from '@/auth/auth.service'
// controller
import { AuthController } from '@/auth/auth.controller'

describe('AuthGuard', () => {
  let authService: AuthService
  let authGuard: AuthGuard

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FirebaseService,
        AuthService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              // 環境変数を取得できるようにする
              if (key === 'firebaseCredentials.projectId') {
                return `${process.env.FB_PROJECT_ID}`
              }
              if (key === 'firebaseCredentials.clientEmail') {
                return `${process.env.FB_CLIENT_EMAIL}`
              }
              if (key === 'firebaseCredentials.privateKey') {
                return `${process.env.FB_PRIVATE_KEY}`.replace(/\\n/g, '\n')
              }
              return ''
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

  it('should cause UnauthorizedException when user is NOT authenticated', async () => {
    const mockContext = createMock<ExecutionContext>()
    mockContext.switchToHttp().getRequest.mockReturnValue({
      headers: {
        authorization: 'Bearer test'
      }
    })

    await authGuard.canActivate(mockContext).catch((error: Error) => {
      const unauthorizedException = new UnauthorizedException()
      expect(error.message).toBe(unauthorizedException.message)
    })
  })
})
