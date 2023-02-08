import { Test, TestingModule } from '@nestjs/testing'
import { TodosService } from '@/todos/todos.service'

describe.skip('TodosService', () => {
  let service: TodosService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosService]
    }).compile()

    service = module.get<TodosService>(TodosService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
