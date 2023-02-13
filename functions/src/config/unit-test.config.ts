// lib
import dotenv from 'dotenv'
import path from 'path'

// テスト用の環境変数を読み込み
const testEnv = dotenv.config({
  path: path.resolve(process.cwd(), '.env') // .env.test などを別途用意した方が良い。
})

// 環境変数にマージ
Object.assign(process.env, {
  ...testEnv.parsed
})
