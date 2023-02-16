// lib
import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
// module
import { AuthModule } from '@/auth/auth.module'
import { FirebaseModule } from '@/firebase/firebase.module'
// controller / service
import { TodosController } from '@/todos/todos.controller'
import { TodosService } from '@/todos/todos.service'
// guard
import { AuthGuard } from '@/auth/auth.guard'
// config
import configuration from '@/config/configuration'

describe('TodosController', () => {
  let controller: TodosController

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        FirebaseModule,
        // 環境変数をセット
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration]
        })
      ],
      providers: [TodosService],
      controllers: [TodosController]
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile()

    controller = module.get<TodosController>(TodosController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('GET: /todos で todo の総数が取得できること。todo の総数は 3 件であること。', async () => {
    const result = await controller.getTodoList()
    expect(result.total).toBe(3)
  })
})
