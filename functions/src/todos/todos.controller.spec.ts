import { Test, TestingModule } from '@nestjs/testing'
import { TodosController } from '@/todos/todos.controller'

describe.skip('TodosController', () => {
  let controller: TodosController

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController]
    }).compile()

    controller = module.get<TodosController>(TodosController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
