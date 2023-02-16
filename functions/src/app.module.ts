// lib
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ThrottlerModule } from '@nestjs/throttler'
// module
import { AuthModule } from '@/auth/auth.module'
import { TodosModule } from '@/todos/todos.module'
import { FirebaseModule } from '@/firebase/firebase.module'
import { StorageModule } from '@/storage/storage.module'
import { VersionModule } from '@/version/version.module'
// app controller / service
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
// config
import configuration from '@/config/configuration'

@Module({
  imports: [
    // 環境変数をセット
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    // ブルートフォース攻撃対策
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10
    }),
    AuthModule,
    TodosModule,
    FirebaseModule,
    StorageModule,
    VersionModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
