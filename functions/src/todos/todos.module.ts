// lib
import { Module } from '@nestjs/common'
// module
import { AuthModule } from '@/auth/auth.module'
import { FirebaseModule } from '@/firebase/firebase.module'
// controller / service
import { TodosController } from '@/todos/todos.controller'
import { TodosService } from '@/todos/todos.service'

@Module({
  imports: [AuthModule, FirebaseModule],
  providers: [TodosService],
  controllers: [TodosController]
})
export class TodosModule {}
